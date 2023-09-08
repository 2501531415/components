<template>
  <div class="cropper">
    <cropper :src="src" :circled="true" @cropend="cropend"/>
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="">
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import cropper from '@/components/cropper/index.vue'

const src = ref("https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg")
const imageUrl = ref("")

const cropend = (info)=>{
  imageUrl.value = info.imgBase64
}
</script>

<style lang="scss" scoped>
.cropper{
  img{
    width: 200px;
    height:200px;
  }
}
</style>
