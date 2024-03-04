<template>
  <div class="easy-player">
    <player :url="url"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import player from '@/components/easyplayer/index.vue'

const url = ref('ws://202.97.134.18:18088/live/783.flv?sign=1881ed280d269de28db106c5a2ad4e71&t=67c69cbd')

</script>

<style lang="scss" scoped>
.easy-player{
  height: 500px;
}
</style>