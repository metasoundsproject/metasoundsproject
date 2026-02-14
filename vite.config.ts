import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// 自定义插件：自动处理图片路径
const fixImagePaths = () => ({
  name: 'fix-image-paths',
  transformIndexHtml(html: string) {
    // 把 src="/images/ 替换为 src="./images/
    // 把 url(/images/ 替换为 url(./images/
    return html
      .replace(/src="\//g, 'src="./')
      .replace(/url\(\//g, 'url(./')
  }
})

export default defineConfig({
  base: '/metasoundsnet/',
  plugins: [
    inspectAttr(), 
    react(),
    fixImagePaths()  // ← 加这一行
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
