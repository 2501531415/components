<template>
  <div v-html="getHtmlData" v-highlight :class="$props.class" class="markdown-viewer"></div>
</template>

<script setup>
  import { computed } from 'vue';
  import showdown from 'showdown';
  import hljs from 'highlight.js' //导入代码高亮文件
  import 'highlight.js/styles/github.css'  //导入代码高亮样式  

  const vHighlight = {
    mounted:(el)=>{
      const blocks = el.querySelectorAll('pre code');
      blocks.forEach((block) => {
          hljs.highlightBlock(block)
      })
    }
  }
  const converter = new showdown.Converter();
  converter.setOption('tables', true);
  const props = defineProps({
    value: { type: String },
    class: { type: String },
  });
  const getHtmlData = computed(() => converter.makeHtml(props.value || ''));
</script>

<style scoped>
  .markdown-viewer {
    width: 100%;
  }
</style>
