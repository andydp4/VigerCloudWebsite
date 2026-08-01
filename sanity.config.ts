'use client'

/**
 * Sanity Studio configuration (Brief 07). Mounted in-app at `/studio`.
 * Uses env-provided project id/dataset; defaults let it load without a real project so builds and
 * the fallback site keep working. Connect a real project by setting NEXT_PUBLIC_SANITY_PROJECT_ID.
 */
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'viger-cloud',
  title: 'Viger Cloud Content',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
