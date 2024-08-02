// global.d.ts
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

// vite.config.ts
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
  ],
  base: "/",
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./setup.ts"
  }
})
