import {v4 as uuidv4} from 'uuid'
//import DefaultVariantSelector from '../components/defaultVariantSelector'

export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Product name is required'),
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'vendor',
      title: 'Vendor',
      type: 'reference',
      to: {type: 'vendor'},
      validation: (Rule) => Rule.required().error('Vendor is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().error('Description is required'),
    },
    {
      name: 'variations',
      title: 'Variations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Variant ID',
              type: 'string',
              initialValue: () => uuidv4(), // Generate a unique ID for the variant
              readOnly: true, // Make the field read-only to prevent manual edits
              description: 'Unique identifier for the variant',
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Color', value: 'color'},
                  {title: 'Package', value: 'package'},
                  {title: 'Style', value: 'style'},
                  // Add more types as needed
                ],
              },
              validation: (Rule) => Rule.required().error('Type is required'),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required().error('Value is required'),
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {hotspot: true},
                  fields: [{name: 'caption', title: 'Caption', type: 'string'}],
                },
              ],
              description: 'Images associated with this variant',
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'type',
            },
            prepare(selection) {
              const {title, subtitle} = selection
              return {
                title,
                subtitle: `Type: ${subtitle}`,
              }
            },
          },
        },
      ],
      description: 'All available variants for this product',
    },
    {
      name: 'furnitureTypes',
      title: 'Furniture Types',
      type: 'array',
      of: [{type: 'reference', to: {type: 'furnitureType'}}],
      description: 'Select the furniture types this product belongs to',
      validation: (Rule) => Rule.required().error('At least one furniture type is required'),
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error('Original price is required and must be a non-negative number'),
    },
    {
      name: 'discountedPrice',
      title: 'Discounted Price',
      type: 'number',
      validation: (Rule) => Rule.min(0).error('Discounted price must be a non-negative number'),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'defaultVariant.images.0',
      originalPrice: 'originalPrice',
      discountedPrice: 'discountedPrice',
    },
    prepare(selection) {
      const {title, media, originalPrice, discountedPrice} = selection
      const percentageDiscount =
        originalPrice && discountedPrice
          ? ((originalPrice - discountedPrice) / originalPrice) * 100
          : 0
      return {
        title,
        media,
        subtitle: discountedPrice
          ? `Original: Rs. ${originalPrice} | Discounted: Rs. ${discountedPrice} (${percentageDiscount.toFixed(
              2,
            )}%)`
          : `Original: Rs. ${originalPrice}`,
      }
    },
  },
}
