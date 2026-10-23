import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devFacebookResolverPlugin } from './dev-facebook-plugin.js';

export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [
    react(),
    command === 'serve' ? devFacebookResolverPlugin() : null
  ].filter(Boolean),
  server: {
    port: 5173,
    open: false,
    allowedHosts: true
  }
}));