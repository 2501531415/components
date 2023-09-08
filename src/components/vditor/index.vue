<template>
  <div ref="wrapRef"></div>
</template>
<script setup>
  import {
    ref,
    unref,
    nextTick,
    computed,
    watch,
    useAttrs,
    onMounted,
    onBeforeUnmount,
    onDeactivated,
  } from "vue";
  import Vditor from "vditor";
  import "vditor/dist/index.css";
  const attrs = useAttrs();
  const props = defineProps({
    height: { type: Number, default: 360 },
    value: { type: String, default: "" },
  });
  
  const emit = defineEmits(["change", "get", "update:value"]);
  const wrapRef = ref(null);
  const vditorRef = ref(null);
  const initedRef = ref(false);
  const valueRef = ref(props.value || "");
  
  watch(
    () => props.value,
    (v) => {
      if (v !== valueRef.value) {
        instance.getVditor().setValue(v);
      }
      valueRef.value = v;
    }
  );

  const init = () => {
    const wrapEl = unref(wrapRef);
    if (!wrapEl) return;
    const bindValue = { ...attrs, ...props };
    const insEditor = new Vditor(wrapEl, {
      theme: "classic",
      lang: "zh_CN",
      mode: "sv",
      fullscreen: {
        index: 520,
      },
      preview: {
        actions: [],
      },
      input: (v) => {
        valueRef.value = v;
        emit("update:value", v);
        emit("change", v);
      },
      after: () => {
        nextTick(() => {
          insEditor.setValue(valueRef.value);
          vditorRef.value = insEditor;
          initedRef.value = true;
          emit("get", instance);
        });
      },
      blur: () => {
        //unref(vditorRef)?.setValue(props.value);
      },
      ...bindValue,
      cache: {
        enable: false,
      },
    });
  };
  
  const instance = {
    getVditor: () => vditorRef.value,
  };
  
  const destroy = () => {
    const vditorInstance = unref(vditorRef);
    if (!vditorInstance) return;
    try {
      vditorInstance.destroy();
    } catch (error) {}
    vditorRef.value = null;
    initedRef.value = false;
  };
  onMounted(init);
  onBeforeUnmount(destroy);
  onDeactivated(destroy);
</script>
