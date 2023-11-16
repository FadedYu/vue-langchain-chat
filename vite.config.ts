import { fileURLToPath, URL } from 'node:url'

import type { UserConfig, ConfigEnv } from 'vite'
import { defineConfig, loadEnv, splitVendorChunk } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需导入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 按需自动导入 elementPlus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 打包文件大小可视化视图预览插件，查看打包模块占用的空间
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取.env文件的VITE_前缀变量
  const envConfig = loadEnv(mode, './')
  // 获取VendorChunk
  const getVendorChunk = splitVendorChunk()

  return {
    server: {
      port: Number(envConfig.VITE_PORT),
      proxy: {
        '/api': {
          target: envConfig.VITE_API_BASEURL,
          ws: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
            directives: true
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
            directives: true
          })
        ]
      }),
      visualizer({
        emitFile: true,
        filename: 'stats.html'
      })
    ],
    build: {
      rollupOptions: {
        output: {
          /**
           * 以函数的形式使用，遍历每一个包，找出对应包名进行分包
           * 将第三方包全部打包在一个chunk中，名称叫 vendor
           */
          manualChunks: (id, options) => {
            if (id.includes('lodash')) {
              return 'lodash'
            }
            // if (id.includes('Login/')) {
            //   //利用文件目录判断
            //   console.log(id.toString().split('Login/')[1].split('.')[0].toString())
            //   return id.toString().split('Login/')[1].split('.')[0].toString()
            // }
            return getVendorChunk(id, options)
          }
        }
      }
    }
  }
})
