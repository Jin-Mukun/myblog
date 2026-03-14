import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 React 相关库打包到一起
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 将 MUI 相关库打包到一起
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          // 将 Markdown 处理打包到一起
          'markdown': ['react-markdown'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 将警告阈值提高到 1000KB
  },
})
