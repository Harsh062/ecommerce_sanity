export const vendor = {
    name: 'vendor',
    title: 'Vendor',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
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
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: { hotspot: true },
      },
    ],
};
  