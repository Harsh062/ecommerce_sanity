import axios from 'axios'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const cheerio = require('cheerio')

import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import os from 'os'

dotenv.config()

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-10-01',
})

const VENDOR_ID = 'a19d0fc8-47ca-42cc-8aa2-f7ecc1edaa64'
const FURNITURE_TYPE_ID = 'e31f5a34-5889-4623-a6be-2c7eb8d3a834'
const BASE_URL = 'https://www.homegenic.in'

const LOG_FILE = path.join(process.cwd(), 'cupboards.log')

function logToFile(message) {
  const timestamp = new Date().toISOString()
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`)
}

function extractSpans($el, $) {
  const blocks = []
  let currentSpans = []

  const flushBlock = () => {
    if (currentSpans.length > 0) {
      blocks.push({
        _key: uuidv4(),
        _type: 'block',
        style: 'normal',
        children: currentSpans,
        markDefs: [],
      })
      currentSpans = []
    }
  }

  $el.contents().each((_, node) => {
    const $node = $(node)

    if (node.type === 'text') {
      const text = $node.text().replace(/\s+/g, ' ').trim()
      if (text) {
        currentSpans.push({
          _key: uuidv4(),
          _type: 'span',
          text,
        })
      }
    } else if (node.tagName?.toLowerCase() === 'strong') {
      const strongText = $node.text().trim()
      if (strongText) {
        currentSpans.push({
          _key: uuidv4(),
          _type: 'span',
          text: strongText,
          marks: ['strong'],
        })
      }
    } else if (node.tagName?.toLowerCase() === 'br') {
      // Treat <br> as a block break
      flushBlock()
    } else if (node.tagName?.toLowerCase() === 'img') {
      const alt = $node.attr('alt') || 'Image'
      flushBlock()
      blocks.push({
        _key: uuidv4(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: uuidv4(),
            _type: 'span',
            text: `[Image: ${alt}]`,
          },
        ],
        markDefs: [],
      })
    } else if (node.tagName?.toLowerCase() === 'span') {
      const nested = extractSpans($node, $)
      nested.forEach((block) => {
        currentSpans.push(...block.children)
      })
    }
  })

  flushBlock()
  return blocks
}

async function scrapeProductDetails($) {
  const blocks = []

  $('.product-description')
    .contents()
    .each((_, el) => {
      const tag = el.tagName?.toLowerCase()
      const $el = $(el)

      // Handle unordered lists
      if (tag === 'ul') {
        const listItems = $el
          .find('li')
          .toArray()
          .map((li) => {
            const liText = $(li).text().trim()
            return {
              _key: uuidv4(),
              _type: 'block',
              style: 'normal',
              listItem: 'bullet',
              level: 1,
              children: [
                {
                  _key: uuidv4(),
                  _type: 'span',
                  text: liText,
                },
              ],
            }
          })
        blocks.push(...listItems)
        return
      }

      // Everything else — treat as rich blocks
      const spanBlocks = extractSpans($el, $)
      blocks.push(...spanBlocks)
    })

  if (blocks.length === 0) {
    blocks.push({
      _key: uuidv4(),
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: uuidv4(),
          _type: 'span',
          text: 'No description available.',
        },
      ],
    })
  }

  return blocks
}

async function scrapeAllProductImages($) {
  const imgSrcs = new Set()

  $('.slider__item img').each((_, el) => {
    const raw = $(el).attr('src')?.trim()
    if (raw) {
      // Ensure full URL and fixed width
      const full = raw.startsWith('//') ? `https:${raw}` : raw
      const cleaned = full.replace(/width=\d+/, 'width=1200') // higher-res
      imgSrcs.add(cleaned)
    }
  })

  const images = []
  for (const src of imgSrcs) {
    try {
      const filename = path.basename(src.split('?')[0])
      const imageId = await uploadImageFromUrl(src, filename)
      images.push({
        _key: uuidv4(),
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId },
      })
      console.log(`✅ Uploaded image: ${filename}`)
      logToFile(`✅ Uploaded image: ${filename}`)
    } catch (err) {
      console.error(`❌ Failed to upload image: ${src}`, err.message)
      logToFile(`❌ Failed to upload image: ${src}`, err.message)
    }
  }

  return images
}

// Check if product with slug already exists
async function productExists(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]._id`
  const existing = await sanity.fetch(query, { slug })
  return !!existing
}

// Upload image from URL to Sanity
async function uploadImageFromUrl(url, filename) {
  const imageRes = await axios.get(url, { responseType: 'arraybuffer' })
  const tempPath = path.join(os.tmpdir(), filename)
  fs.writeFileSync(tempPath, imageRes.data)

  const asset = await sanity.assets.upload(
    'image',
    fs.createReadStream(tempPath),
    {
      filename,
    },
  )

  fs.unlinkSync(tempPath)
  return asset._id
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function scrapePage(pageNumber = 1) {
  const productsListUrl = `${BASE_URL}/collections/cupboards?page=${pageNumber}`
  console.log(`\n🔎 Scraping page ${pageNumber}: ${productsListUrl}`)
  logToFile(`\n🔎 Scraping page ${pageNumber}: ${productsListUrl}`)
  const res = await axios.get(productsListUrl)
  const $ = cheerio.load(res.data)

  const productElems = $('.product-block')
  const processed = []

  for (let i = 0; i < productElems.length; i++) {
    console.log(
      'Processing ith product: ',
      i + 1,
      ' for pageNumber: ',
      pageNumber,
    )
    logToFile(
      'Processing ith product: ',
      i + 1,
      ' for pageNumber: ',
      pageNumber,
    )
    const el = productElems[i]
    const name = $(el).find('.product-block__title').text().trim()
    const discountedPrice = parseInt(
      $(el).find('.price__current').text().replace(/[^\d]/g, ''),
      10,
    )
    const originalPrice = parseInt(
      $(el).find('.price__was').text().replace(/[^\d]/g, ''),
      10,
    )
    const slugHref = $(el).find('.product-link').attr('href')
    const slug = slugHref.split('/').pop()
    const productUrl = BASE_URL + slugHref
    console.log(
      `\n🛒 (${i + 1}/${productElems.length}) Processing: ${name} (${slug})`,
    )
    logToFile(
      `\n🛒 (${i + 1}/${productElems.length}) Processing: ${name} (${slug})`,
    )
    const alreadyExists = await productExists(slug)

    if (alreadyExists) {
      console.log(`⚠️  Skipping duplicate: ${slug}`)
      logToFile(`⚠️ Skipping duplicate: ${slug}`)
      continue
    }
    const prodDetailResp = await axios.get(productUrl)
    const details$ = cheerio.load(prodDetailResp.data)
    const description = await scrapeProductDetails(details$)
    let imgUrl = details$(el)
      .find('.product-block__image--primary img')
      .attr('src')

    // Handle relative URL by prefixing the domain
    if (imgUrl && imgUrl.startsWith('/')) {
      imgUrl = 'https:' + imgUrl
    }

    const images = await scrapeAllProductImages(details$)

    if (images.length === 0) {
      console.warn(`⚠️ No images found for: ${slug}`)
      logToFile(`⚠️ No images found for: ${slug}`)
      continue
    }

    const productDoc = {
      _type: 'product',
      name,
      slug: { _type: 'slug', current: slug },
      vendor: { _type: 'reference', _ref: VENDOR_ID },
      furnitureTypes: [
        { _key: uuidv4(), _type: 'reference', _ref: FURNITURE_TYPE_ID },
      ],
      description,
      originalPrice,
      discountedPrice,
      variations: [
        {
          _key: uuidv4(),
          _type: 'object',
          id: uuidv4(),
          type: 'color',
          value: 'black',
          images,
        },
      ],
    }

    const created = await sanity.create(productDoc)
    console.log(`✅ Created product: ${created.name} (${created._id})`)
    logToFile(`✅ Created: ${created.name} (${created._id})`)
    processed.push(created)
    await delay(2500) // Wait 2.5 seconds between products
  }

  return processed
}

async function scrapeAllPages() {
  let page = 1
  let hasMoreProducts = true

  while (hasMoreProducts) {
    const scraped = await scrapePage(page)
    console.log(`📦 Page ${page} done — ${scraped.length} product(s) scraped.`)
    logToFile(`📦 Page ${page} done — ${scraped.length} product(s) scraped.`)

    if (scraped.length === 0) {
      hasMoreProducts = false
      console.log(`✅ No more products. Scraping complete.`)
      logToFile(`✅ No more products. Scraping complete.`)
    } else {
      page++
      await delay(3000) // Delay between pages (3 seconds)
    }
  }
}

async function main() {
  try {
    console.log(`🚀 Starting full scrape...`)
    logToFile(`🚀 Starting full scrape...`)
    await scrapeAllPages()
    console.log(`🎉 All pages scraped.`)
    logToFile(`🎉 All pages scraped.`)
  } catch (err) {
    console.error('❌ Script error:', err)
  }
}

main()
