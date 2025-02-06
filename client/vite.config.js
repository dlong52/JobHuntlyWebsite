import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
