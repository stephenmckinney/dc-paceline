import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'
import { sanityConfig } from './config'

export default defineConfig({
  name: 'dc-paceline',
  title: 'DC Paceline',

  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: '/admin',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
