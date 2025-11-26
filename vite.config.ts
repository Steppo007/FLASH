import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path, { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@root': resolve(__dirname),
      '@sbook': path.join(resolve(__dirname), 'src/storybook'),
      '@complib': path.join(resolve(__dirname), 'src/components'),
    },
  },
});
