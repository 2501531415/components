export function getRoutes(microName){
  // 微应用时，添加微应用前缀
  const profix = microName?`/${microName}`:''
  const routes = [
    {
      path:`${profix}/editor/tinymec`,
      component:()=>import('@/views/editor/tinymec.vue'),
    },
    {
      path:`${profix}/editor/vditor`,
      component:()=>import('@/views/editor/vditor.vue'),
    },
    {
      path:`${profix}/countTo`,
      component:()=>import('@/views/countTo/index.vue'),
    },
    {
      path:`${profix}/cropper`,
      component:()=>import('@/views/cropper/index.vue'),
    }
  ]
  return routes
}