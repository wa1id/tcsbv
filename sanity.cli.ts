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
  deployment: {autoUpdates: true, appId: 'gu20oxcrp29nynskmofenvyg'},
  
  // Use deployment config for standalone studio
  studioHost: 'tcsbv',

})