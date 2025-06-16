import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                resultado: path.resolve(__dirname, 'resultado.html'),
            },
        },
        outDir: 'docs',
    },
})
