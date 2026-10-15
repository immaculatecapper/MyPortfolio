import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration – enables JSX / Fast Refresh via the React plugin.
// The proxy forwards API calls from the React dev server (port 5173)
// to the Express backend (port 3000), so the frontend can call "/api/...".
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
  },
});
