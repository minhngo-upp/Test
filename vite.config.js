import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site serves at /<repo>/, not /
  // Repo name here is Test -> https://<user>.github.io/Test/
  base: '/Test/',
})
