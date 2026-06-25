import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/worldcup-2026/',
  plugins: [react()],
  server: {
    proxy: {
      '/football-api': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/football-api/, ''),
      },
    },
  },
})
