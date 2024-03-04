<template>
  <div class="EasyPlayer">
    <easy-player
      style="width: 100%; height: 100%"
      @error="restartPlayer"
      @ended="restartPlayer"
      @play="videoPlay"
      ref="EasyPlayerRef"
      :video-url="url"
      :aspect="aspect"
      :showEnterprise="false"
      :show-custom-button="false"
      :alt="alt"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :live="live"
      fluent
      stretch
    >
    </easy-player>
  </div>
</template>
<script setup>
import { ref, onUnmounted } from "vue";

const timer = ref(null);
const EasyPlayerRef = ref(null);

const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  aspect: {
    type: String,
    default: "16:9",
  },
  alt: {
    type: String,
    default: "无信号",
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  muted: {
    type: Boolean,
    default: true,
  }
});

const emits = defineEmits(["pullFlow"]);
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
});
const restartPlayer = (e) => {
  console.log(e, "播放异常或播放结束或直播断流------->>>>>>>>>");
  console.log(EasyPlayerRef.value)
};

const videoPlay = () => {
  
};
</script>
<style scoped>
.EasyPlayer {
  width: 100%;
  height: 100%;
}
/* 阻止单击双击视频全屏或者跳转官网 */
/* /deep/ .vjs-tech {
    pointer-events: none!important;
  } */
/* /deep/ .video-js.vjs-fullscreen::backdrop,:not(:root):fullscreen::backdrop {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    width: 50%!important;
    height: 50%!important;
    right: 50%!important;
    bottom: 50%!important;
    background-color: transparent!important;
  }
  /deep/ .video-js.vjs-fullscreen .vjs-tech {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%!important;
    height: 50%!important;
    transform: translateX(-50%)!important;
  }
  /deep/ .video-js {
    background-color: transparent!important;
  } */
</style>
