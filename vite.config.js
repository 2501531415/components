import { defineConfig } from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
const { name } = require('./package');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),qiankun(name,{useDevMode:true})],
  server: {
    port:8882
  },
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  }
})
