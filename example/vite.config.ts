import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@/': '/src/',
        },
    },
    plugins: [
        react(),
        svgr(),
    ],
});
