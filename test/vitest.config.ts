/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // @testing-library/jest-dom/vitest without globals will not work properly.
    globals: true
  },
})