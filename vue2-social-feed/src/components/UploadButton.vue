<template>
  <label class="upload" for="upload">
    <input
      id="upload"
      type="file"
      @input="oninput"
      :multiple="max > 1"
      :accept="accept"
    />
    <slot />
  </label>
</template>

<script>
import { FileRepository, LoadingStatus } from "@amityco/js-sdk";

export default {
  components: {},
  props: {
    max: {
      type: Number,
      default: 10,
    },
    accept: {
      type: String,
      default: "image/*,video/*",
    },
  },
  methods: {
    async oninput(e) {
      const files = Array.from(e.target.files).slice(0, this.max);
      this.$emit("uploadStart", files);
      console.log("UPLOADING ", files);
      if (files[0].type.startsWith("video")) {
        const liveObject = FileRepository.createVideo({
          file: files[0],
          onProgress: ({ currentFile, currentPercent }) => {console.log("Uploading: "+currentPercent)},
        });

        liveObject.once("loadingStatusChanged", ({ newValue }) => {
          if (newValue === LoadingStatus.Loaded) {
            this.$emit("success", [liveObject.model]);
          }
        });
      } else {
        const filesData = await FileRepository.uploadFiles({ files });
        this.$emit("success", filesData);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.upload {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;

  input {
    position: absolute;
    z-index: -1;
    visibility: hidden;
  }
}
</style>
