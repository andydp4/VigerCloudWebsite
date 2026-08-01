import type { StructureResolver } from 'sanity/structure'

// Desk structure: Site settings is a singleton; everything else is a normal document list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('featureChapter').title('Arcarna feature chapters'),
      S.documentTypeListItem('pricingPlan').title('Pricing plans'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('legalDocument').title('Legal documents'),
      S.documentTypeListItem('companyUpdate').title('Company updates'),
    ])
