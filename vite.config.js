import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import previewPlugin from './serverStart'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), previewPlugin()],
  server:
  {
    proxy: {
      '/preview': 'http://localhost:8080'
    }
  }
})
