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

## Planned upgrade (Brief 07 full)

Migrate these modules to **Sanity** (preferred) with draft/publish, previews, restricted editor
roles, and audit history for price changes. The typed models in `types.ts` are the contract, so the
migration should not require component changes. Tracked as **Deferred** in `DECISIONS.md`.
