// schemas/heroProducts.js
export const heroProducts = {
  name: 'heroProducts',
  title: 'Hero Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for the hero section (e.g., "Featured Products").',
      validation: (Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description for the hero section.',
      rows: 3,
      validation: (Rule) => Rule.max(200).error('Description should not exceed 200 characters'),
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Select the products to feature in the hero carousel.',
      validation: (Rule) => Rule.min(1).error('At least one product must be selected'),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'products.0.images.0',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? subtitle : 'No description',
        media,
      }
    },
  },
}
