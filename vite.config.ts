import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 通过环境变量判断部署环境
  base: process.env.GITHUB_ACTIONS ? '/commonTools/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
