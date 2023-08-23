import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'


export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock', // 设置模拟数据的存储文件夹
        supportTs: true,     // 是否读取ts文件模块
        logger: true,        // 是否在控制台显示请求日志
        localEnabled: command === 'serve',  // 设置是否启用本地mock文件
        prodEnabled: true,   // 设置打包是否启用mock功能
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        }
      ]
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://zany-robot-9x6rj7w457rcpg4r-7001.preview.app.github.dev',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  }
}
