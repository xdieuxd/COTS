import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@mytypes': path.resolve(__dirname, 'src/types'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@routes': path.resolve(__dirname, 'src/routes')
    },
  },
  server: { port: 3000 },
});
