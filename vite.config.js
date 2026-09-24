import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/UpSkillBuddy/' : '/',
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        roadmap: 'ai-roadmap.html',
        genai: 'genai.html',
      },
    },
  },
})
