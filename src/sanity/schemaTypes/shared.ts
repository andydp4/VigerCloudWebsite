import { defineField } from 'sanity'

/** Reusable source-status field so every editable record can be marked confirmed→blocked. */
export const sourceStatusField = defineField({
  name: 'sourceStatus',
  title: 'Source status',
  type: 'string',
  options: {
    list: [
      { title: 'Confirmed', value: 'confirmed' },
      { title: 'Assumption', value: 'assumption' },
      { title: 'Placeholder', value: 'placeholder' },
      { title: 'Blocked', value: 'blocked' },
    ],
    layout: 'radio',
  },
  initialValue: 'placeholder',
  validation: (rule) => rule.required(),
})
