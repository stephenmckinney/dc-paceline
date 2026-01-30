import { defineCliConfig } from 'sanity/cli'
import { sanityConfig } from './sanity/config'

export default defineCliConfig({
  api: {
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  },
})
