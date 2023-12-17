import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Number of port running locally
        strictPort: true, // Exit if port is already in use, instead of automatically trying the next available port
        open: true, // Automatically open the app in the browser on server start
    },
});
