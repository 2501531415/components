<template>
  <div :style="{ width: containerWidth }">
    <textarea
      :id="tinymceId"
      ref="elRef"
      :style="{ visibility: 'hidden' }"
    ></textarea>
  </div>
</template>

<script setup>
import { bindHandlers } from "./helper";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autosave";
import "tinymce/plugins/code";
import "tinymce/plugins/image";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/hr";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/print";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/template";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

import {
  computed,
  nextTick,
  ref,
  unref,
  watch,
  useAttrs,
  onMounted,
  onDeactivated,
  onBeforeUnmount,
} from "vue";
import { toolbar, plugins } from "./tinymce";

const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
  value: {
    type: String,
  },

  toolbar: {
    type: Array,
    default: toolbar,
  },
  plugins: {
    type: Array,
    default: plugins,
  },
  modelValue: {
    type: String,
  },
  height: {
    type: [Number, String],
    required: false,
    default: 400,
  },
  width: {
    type: [Number, String],
    required: false,
    default: "auto",
  },
  showImageUpload: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits([
  "change",
  "update:modelValue",
  "inited",
  "init-error",
]);
const editorRef = ref(null);
const fullscreen = ref(false);
const tinymceId = ref("tiny-vue");
const elRef = ref(null);
const attrs = useAttrs();
const tinymceContent = computed(() => props.modelValue);

const containerWidth = computed(() => {
  const width = props.width;
  if (typeof width == "number") {
    return `${width}px`;
  }
  return width;
});

const skinName = computed(() => {
  // return appStore.getDarkMode === 'light' ? 'oxide' : 'oxide-dark';
  return "oxide";
});

const langName = computed(() => {
  return "zh_CN";
});

const initOptions = computed(() => {
  const { height, options, toolbar, plugins } = props;
  const publicPath = "/";
  return {
    selector: `#${unref(tinymceId)}`,
    height,
    toolbar,
    menubar: "file edit insert view format table",
    plugins,
    automatic_uploads: false,
    paste_data_images: true,
    object_resizing:true,
    file_picker_types:"media",
    language_url:
      publicPath + "resource/tinymce/langs/" + langName.value + ".js",
    language: langName.value,
    branding: false,
    default_link_target: "_blank",
    link_title: false,
    auto_focus: true,
    skin: skinName.value,
    skin_url: publicPath + "resource/tinymce/skins/ui/" + skinName.value,
    content_css:
      publicPath +
      "resource/tinymce/skins/ui/" +
      skinName.value +
      "/content.min.css",
    ...options,
    setup: (editor) => {
      editorRef.value = editor;
      editor.on("init", (e) => initSetup(e));
    },
    images_upload_handler: (blobInfo, success, failure) => {
      console.log(blobInfo)
      success("https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg");
      // 这个函数主要处理word中的图片，并自动完成上传；
      // let formData = new FormData();
      // formData.append("fileType", 1);
      // formData.append("fileUseType", 2);
      // formData.append("file", blobInfo.blob(), blobInfo.filename());
      // uploadIMG(this.action, formData)
      //   .then((data) => {
      //     if (this.resFormat) {
      //       const bb = this.resFormat.split(".");
      //       bb.forEach((i) => {
      //         data = data[i];
      //       });
      //     }
      //     const { fileUrl, url, fileName, fileId } = data[0] || data || {};
      //     const fileData = {
      //       url: fileUrl || url,
      //       name: fileName,
      //       id: fileId,
      //     };
      //     // 上传成功后，调用success函数传入图片地址
      //     success(fileData.url);
      //   })
      //   .catch((error) => {
      //     this.$message.error("上传失败，请重新上传");
      //   });
    },
  };
});

const disabled = computed(() => {
  const { options } = props;
  const getdDisabled = options && Reflect.get(options, "readonly");
  const editor = unref(editorRef);
  if (editor) {
    editor.setMode(getdDisabled ? "readonly" : "design");
  }
  return getdDisabled ?? false;
});

watch(
  () => attrs.disabled,
  () => {
    const editor = unref(editorRef);
    if (!editor) {
      return;
    }
    editor.setMode(attrs.disabled ? "readonly" : "design");
  }
);

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      initEditor();
    }, 30);
  });
});

onBeforeUnmount(() => {
  destory();
});

onDeactivated(() => {
  destory();
});

const destory = () => {
  if (tinymce !== null) {
    const selector = unref(initOptions).selector;
    tinymce.remove.selector;
  }
};

const initEditor = () => {
  const el = unref(elRef);
  if (el) {
    el.style.visibility = "";
  }
  tinymce
    .init(unref(initOptions))
    .then((editor) => {
      emit("inited", editor);
    })
    .catch((err) => {
      emit("init-error", err);
    });
};

const initSetup = (e) => {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  const value = props.modelValue || "";

  editor.setContent(value);
  bindModelHandlers(editor);
  bindHandlers(e, attrs, unref(editorRef));
};

const setValue = (editor, val, prevVal) => {
  if (
    editor &&
    typeof val === "string" &&
    val !== prevVal &&
    val !== editor.getContent({ format: attrs.outputFormat })
  ) {
    editor.setContent(val);
  }
};

const bindModelHandlers = (editor) => {
  const modelEvents = attrs.modelEvents ? attrs.modelEvents : null;
  const normalizedEvents = Array.isArray(modelEvents)
    ? modelEvents.join(" ")
    : modelEvents;

  watch(
    () => props.modelValue,
    (val, prevVal) => {
      setValue(editor, val, prevVal);
    }
  );

  watch(
    () => props.value,
    (val, prevVal) => {
      setValue(editor, val, prevVal);
    },
    {
      immediate: true,
    }
  );

  editor.on(
    normalizedEvents ? normalizedEvents : "change keyup undo redo",
    () => {
      const content = editor.getContent({ format: attrs.outputFormat });
      emit("update:modelValue", content);
      emit("change", content);
    }
  );

  editor.on("FullscreenStateChanged", (e) => {
    fullscreen.value = e.state;
  });
};

const handleImageUploading = (name) => {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  editor.execCommand("mceInsertContent", false, getUploadingImgName(name));
  const content = editor.getContent() ?? "";
  setValue(editor, content);
};

const handleDone = (name, url) => {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  const content = editor.getContent() ?? "";
  const val =
    content.replace(getUploadingImgName(name), `<img src="${url}"/>`) ?? "";
  setValue(editor, val);
};

const getUploadingImgName = (name) => {
  return `[uploading:${name}]`;
};
</script>
