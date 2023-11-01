import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collaborators',
  title: 'Collaborator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        name: 'linkedIn',
        title: 'LinkedIn URL',
        type: 'string',
      }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
