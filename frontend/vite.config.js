import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/subjects': 'http://localhost:3001',
      '/timetable': 'http://localhost:3001',
      '/attendance': 'http://localhost:3001',
    },
  },
}); 