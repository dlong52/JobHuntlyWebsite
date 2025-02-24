import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  base: '/',  // 👈 Đặt lại base URL
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Vercel yêu cầu build output ở đây
  },
  server: {
    port: 8000,
  },
});
