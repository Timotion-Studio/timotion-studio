'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../../../sanity/schemaTypes'
import { createTokenAuthStore } from '../../../sanity/tokenAuthStore'
import { useMemo } from 'react'

export default function StudioClient({ token }: { token: string }) {
  const config = useMemo(
    () =>
      defineConfig({
        basePath: '/studio',
        name: 'timotion-studio',
        title: 'Timotion Studio',
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
        plugins: [structureTool(), visionTool()],
        schema: { types: schemaTypes },
        auth: createTokenAuthStore(token),
      }),
    [token],
  )

  return <NextStudio config={config} unstable_noAuthBoundary />
}
