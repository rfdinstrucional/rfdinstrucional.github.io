import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 500
    }
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true
  },
  build: {
    target: 'es2018',
    reportCompressedSize: false
  }
});
