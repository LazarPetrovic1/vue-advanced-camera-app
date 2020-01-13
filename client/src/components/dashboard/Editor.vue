<template>
  <div class="page">
    <div class="imageEditorApp">
      <b-button-toolbar>
        <b-button @click="cropMode()">Toggle Crop Mode</b-button>
      </b-button-toolbar>
      <br />
      <tui-image-editor ref="editor" :include-ui="useDefaultUI" :options="options"></tui-image-editor>
    </div>
  </div>
</template>

<script>
import { ImageEditor } from "@toast-ui/vue-image-editor";
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const blackTheme = {
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc
}

export default {
  name: "home",
  components: {
    "tui-image-editor": ImageEditor
  },
  data() {
    return {
      useDefaultUI: true,
      options: {
        cssMaxWidth: window.innerWidth,
        cssHeight: 800,
        includeUI: {
          theme: blackTheme
        },
        initMenu: "filter"
      }
    }
  },
  methods: {
    cropMode() {
      const drawingMode = this.$refs.editor.invoke("getDrawingMode");
      if (drawingMode == "CROPPER") {
        this.$refs.editor.invoke("startDrawingMode", "FREE_DRAWING");
      } else {
        this.$refs.editor.invoke("startDrawingMode", "CROPPER");
      }
    },
  }
};
</script>

<style scoped>
.imageEditorApp {
  width: 80%;
  margin: auto;
  height: calc(100vh - 150px);
}
</style>
