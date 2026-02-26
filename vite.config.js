import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so project sites like /Test/ don't break.
  base: './',
})
