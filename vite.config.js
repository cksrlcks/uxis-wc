import { defineConfig, splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  base: '/uxis-wc/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `uxis-wc.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});
