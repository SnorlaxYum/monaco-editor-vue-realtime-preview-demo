import server from './server'

export default function previewPlugin() {
    const virtualFileId = '@server'
  
    return {
      name: 'server', // required, will show up in warnings and errors
      resolveId(id) {
        if (id === virtualFileId) {
          return virtualFileId
        }
      },
      load(id) {
        if (id === virtualFileId) {
          return `export const msg = "from virtual file"`
        }
      }
    }
  }