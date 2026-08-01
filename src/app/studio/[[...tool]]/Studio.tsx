'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Client-only Studio wrapper so the heavy editor bundle stays out of server rendering.
export default function Studio() {
  return <NextStudio config={config} />
}
