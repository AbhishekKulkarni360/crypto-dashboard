// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'recharts',
    ],
  },

  esbuild: {
    target: 'esnext',
  },

  server: {
    host: '127.0.0.1', // Faster than localhost on Windows
  },

  build: {
    minify: 'esbuild',
    target: 'esnext',
  },
});
