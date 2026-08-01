import { defineField, defineType, type SchemaTypeDefinition } from 'sanity'
import { sourceStatusField } from './shared'

const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: ['available', 'beta', 'coming-soon', 'concept'],
      },
      initialValue: 'concept',
    }),
    defineField({
      name: 'brand',
      type: 'string',
      options: { list: ['viger', 'arcarna'] },
      initialValue: 'viger',
    }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    sourceStatusField,
  ],
  preview: { select: { title: 'name', subtitle: 'status' } },
})

const featureChapter = defineType({
  name: 'featureChapter',
  title: 'Arcarna feature chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      options: { list: ['Sell', 'Understand', 'Control', 'Act', 'Grow'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'result', title: 'Business result', type: 'text', rows: 2 }),
    defineField({ name: 'mechanism', type: 'text', rows: 2 }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    sourceStatusField,
  ],
  preview: { select: { title: 'label', subtitle: 'result' } },
})

const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing plan',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'planId',
      title: 'Plan id',
      type: 'string',
      options: { list: ['solo', 'team', 'growth', 'scale'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'audience', type: 'string' }),
    defineField({ name: 'monthly', title: 'Monthly (GBP, excl. VAT)', type: 'number' }),
    defineField({ name: 'annual', title: 'Annual per month (GBP, excl. VAT)', type: 'number' }),
    defineField({ name: 'highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'consultationOnly', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    sourceStatusField,
  ],
  preview: { select: { title: 'name', subtitle: 'planId' } },
})

const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'text', rows: 3 }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    sourceStatusField,
  ],
  preview: { select: { title: 'question' } },
})

const legalDocument = defineType({
  name: 'legalDocument',
  title: 'Legal document',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      type: 'string',
      options: { list: ['viger', 'arcarna', 'shared'] },
      initialValue: 'shared',
    }),
    defineField({ name: 'effectiveDate', type: 'string', initialValue: 'Pending' }),
    defineField({ name: 'summary', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    sourceStatusField,
  ],
  preview: { select: { title: 'title', subtitle: 'brand' } },
})

const companyUpdate = defineType({
  name: 'companyUpdate',
  title: 'Company update',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'body', type: 'text', rows: 3 }),
    sourceStatusField,
  ],
  preview: { select: { title: 'title', subtitle: 'date' } },
})

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', type: 'string', initialValue: 'Viger Cloud' }),
    defineField({ name: 'legalName', type: 'string' }),
    defineField({ name: 'companyNumber', type: 'string' }),
    defineField({ name: 'registeredAddress', type: 'string' }),
    defineField({ name: 'vatNote', type: 'string', initialValue: 'All prices exclude VAT.' }),
    defineField({ name: 'group', type: 'string' }),
    sourceStatusField,
  ],
  preview: { select: { title: 'brandName' } },
})

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  product,
  featureChapter,
  pricingPlan,
  faq,
  legalDocument,
  companyUpdate,
]
