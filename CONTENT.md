# Content Matrix & Administration Guide (Briefs 02 & 07)

## How content works today

All marketing content is **structured data**, not prose hard-coded in components. It lives in
`src/content/`:

| File | Contains |
|------|----------|
| `products.ts` | Product portfolio + honest status labels |
| `arcarna.ts` | Arcarna narrative scenes and feature chapters |
| `pricing.ts` | Plans, prices (VAT-excluded) and comparison rows |
| `site.ts` | Company/legal details, contact routes, FAQs, legal docs, updates |
| `navigation.ts` | Header/footer navigation |
| `types.ts` | The typed models everything conforms to |

Every business-meaningful record carries a `sourceStatus` of `confirmed | assumption | placeholder
| blocked`, surfaced on the site via the status badge so unconfirmed content is never mistaken for
final. **Prices only ever exist as structured fields — never as free text.**

## Editing content (non-developer friendly, first release)

1. Open the relevant file in `src/content/`.
2. Change the value (e.g. a plan's `monthly`/`annual`, a product's `status`, a legal
   `effectiveDate`).
3. Update `sourceStatus` to reflect approval (`placeholder` → `confirmed` once signed off).
4. Save; the dev server hot-reloads. Run `npm run build` to verify before publishing.

An authorised non-developer can safely update a product, a price, a comparison row, and a legal
effective date this way in staging.

## Content matrix (page → source status)

| Page | Source status | Confirm before launch |
|------|---------------|-----------------------|
| Home | placeholder/assumption | Copy (B2) |
| About | placeholder | Company details (B1), copy (B2) |
| Products | assumption/placeholder | Portfolio claims (B2) |
| Arcarna | placeholder | Product content + imagery (B2, B6) |
| Pricing | placeholder | Figures + entitlements (B3) |
| Contact/Partners | assumption/blocked | Inbox destinations (B4) |
| Legal ×6 | placeholder | Reviewed wording (B7) |

## Sanity CMS (Brief 07)

Sanity is now integrated and **optional**:

- Studio is embedded at **`/studio`** (schemas in `src/sanity/schemaTypes/`).
- Pages read content through **`src/lib/content.ts`**, which returns Sanity data when a project id is
  configured and otherwise the local fallback above. Sanity fetch failures also fall back, so the
  site never blanks.
- Connect a project by setting `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` (see
  `DEPLOYMENT.md`). Until a dataset has content, the built-in fallback is used.

Modelled in Sanity today: site settings, products, Arcarna feature chapters, pricing plans, FAQs,
legal documents, company updates. **Prices are structured fields, never free text.**

Not yet modelled in Sanity (still edited in `src/content/**`): the pricing comparison rows and the
Arcarna narrative scenes. These are the next candidates to migrate; the `types.ts` contract keeps
that change isolated from components.

### Editor workflow (once connected)

Draft/publish, previews and role restrictions are provided by Sanity Studio. Configure editor roles
and (for price-change audit history) document history in the Sanity project settings.
