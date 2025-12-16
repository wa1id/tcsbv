import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Import your schema and structure
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  name: 'tcsbv-studio',
  title: 'TCSBV Studio',
  projectId: 'aw8v1cq7',
  dataset: 'production',
  // Remove basePath for standalone deployment
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2025-12-14'}),
  ],
})