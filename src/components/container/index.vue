<template>
  <div class="dashboard-view">
    <div id="resize" :ref="ref" :style="{'background-image':'url('+bgImg+')'}">
      <template v-if="ready">
        <slot></slot>
      </template>
  </div>
  </div>
</template>

<style>
#resize {
  position: fixed;
  top: 0px;
  background-size: 100% 100%;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
<script>
import autoResize from "./mixins";

export default {
  name: "DvFullScreenContainer",
  mixins: [autoResize],
  data() {
    return {
      ref: "full-screen-container",
      allWidth: 0,
      scale: 0,
      datavRoot: "",
      ready: false,
    };
  },
  props:{
    bgImg:{
      tyep:String
    }
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this;

      initConfig();

      setAppScale();

      this.ready = true;
    },
    initConfig() {
      const { dom } = this;
      const { width } = screen;
      const { innerHeight:height } = window
      
      this.allWidth = width;

      dom.style.width = `${width}px`;
      dom.style.height = `${height}px`;
    },
    setAppScale() {
      const { allWidth, dom } = this;

      const currentWidth = document.body.clientWidth;

      dom.style.transform = `scale(${currentWidth / allWidth})`;
    },
    onResize() {
      const { initConfig,setAppScale } = this;
      initConfig()
      setAppScale();
    },
  },
};
</script>

<style scoped>
  .dashboard-view{
    width: 100%;
    height: 100%;
    background-color: #041235;
  }
</style>