import { createApp } from 'vue'
import App from './App.vue'
import {getRoutes} from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import '@/assets/css/global.scss'

let router = null;
let instance = null;
function render(props = {}){
  const {container,name} = props
  const routes = getRoutes(props.name)
  const history = createWebHashHistory()
  router = createRouter({
    history,
    routes
  })
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    //路由拦截
    router.beforeEach((to,form,next)=>{
      if(!to.path.includes(`/${name}`)){
        return next({path:`/${name}${to.path}`})
      }
      next()
    })
    //监听主应用状态变化
    props.onGlobalStateChange((state,prev)=>{
      console.log(state)
    })
  }
  
  instance = createApp(App).use(router).mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

renderWithQiankun({
  mount(props) {
    console.log(props)
    render(props)
  },
  bootstrap() {
    console.log('%c%s', 'color: green;', 'vue3.0 app bootstraped')
  },
  unmount() {
    instance.unmount()
    instance._container.innerHTML = ''
    instance = null
    router = null
    history.destroy()
  },
  update() {
    console.log('update')
  }
})