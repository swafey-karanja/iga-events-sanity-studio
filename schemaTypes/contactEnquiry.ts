import {defineField, defineType} from 'sanity'

const info = (name: string, title: string, type: 'string' | 'text' = 'string') =>
  defineField({name, title, type, readOnly: true})

export const contactEnquiryType = defineType({
  name: 'contactEnquiry',
  title: 'Contact enquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In progress', value: 'in-progress'},
          {title: 'Handled', value: 'handled'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({name: 'receivedAt', title: 'Received', type: 'datetime', readOnly: true}),
    info('name', 'Full name'),
    info('organisation', 'Organisation'),
    info('email', 'Email'),
    info('phone', 'Phone'),
    info('jobTitle', 'Job title'),
    info('eventName', 'Event name'),
    info('eventType', 'Event type'),
    info('industry', 'Industry'),
    defineField({name: 'location', type: 'array', of: [{type: 'string'}], readOnly: true}),
    info('attendance', 'Expected attendance'),
    info('eventDate', 'Proposed date'),
    info('duration', 'Duration'),
    defineField({name: 'services', type: 'array', of: [{type: 'string'}], readOnly: true}),
    info('budget', 'Budget'),
    info('message', 'Message', 'text'),
    defineField({name: 'consent', type: 'boolean', readOnly: true}),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: 'receivedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'organisation', status: 'status'},
    prepare: ({title, subtitle, status}) => ({
      title,
      subtitle: `${status ?? 'new'} · ${subtitle ?? ''}`,
    }),
  },
})
