import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    base: '/KCC-Project/',
    open: false
  }


  // https://vite.dev/config/

});
