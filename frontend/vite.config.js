import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'pdfjs-dist': 'pdfjs-dist/legacy/build/pdf',
    },
  },
  optimizeDeps: {
    include: ['react-pdf'],
  },
  build: {
    commonjsOptions: {
      include: [/react-pdf/, /node_modules/],
    },
  },
  base: 'https://congnghetoday.com/'
});
