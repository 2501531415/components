<template>
  <div class="editor">
    <p>markdown编辑器</p>
    <vditor v-model:value="remark"/>
    <p>markdown回显</p>
    <markdownViewer :value="remark"></markdownViewer>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import vditor from '@/components/vditor/index.vue'
import markdownViewer from '@/components/markdownViewer/index.vue'

const remark = ref('# This is a markdown text')
</script>
