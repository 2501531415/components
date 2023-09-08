<template>
  <Tinymec :width="800" v-model="remark"/>
</template>

<script setup>
import {ref} from 'vue'
import Tinymec from '@/components/tinymec/index.vue'

const remark = ref('<p>6666</p>')
</script>

<style>

</style>