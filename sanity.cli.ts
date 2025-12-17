import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'aw8v1cq7',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  
  // Use deployment config for standalone studio
  studioHost: 'tcsbv',
  
  // Deployment configuration
  deployment: {
    appId: 'gu20oxcrp29nynskmofenvyg',
  },
})