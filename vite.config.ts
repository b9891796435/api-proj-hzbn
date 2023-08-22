import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://zany-robot-9x6rj7w457rcpg4r-7001.preview.app.github.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
