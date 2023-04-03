import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'localeString',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noFeesTitle',
      title: 'No Fees Title',
      type: 'localeString',
    }),
    defineField({
      name: 'noFeesDescription',
      title: 'No Fees Description',
      type: 'localeText',
    }),
  ],
})
