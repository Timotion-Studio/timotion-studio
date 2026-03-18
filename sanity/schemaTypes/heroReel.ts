import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroReel',
  title: 'Hero Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'vimeoId',
      title: 'Vimeo ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value) return true
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id?.replace(/^drafts\./, '')
          const result = await client.fetch<number>(
            `count(*[_type == "heroReel" && active == true && !(_id in [$id, $draftId])])`,
            { id, draftId: `drafts.${id}` },
          )
          return result === 0 || 'Only one hero reel can be active at a time'
        }),
    }),
  ],
})
