export const furnitureType = {
  name: 'furnitureType',
  title: 'Furniture Type',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'featuredLabelText',
      title: 'Featured Label Text',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().error('Description is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
      validation: (Rule) => Rule.required().error('Category is required'),
    },
    {
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference',
      to: {type: 'subCategory'},
    },
  ],
}
