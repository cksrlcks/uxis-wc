import { defineConfig, splitVendorChunkPlugin } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  //plugins: [babel()],
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
