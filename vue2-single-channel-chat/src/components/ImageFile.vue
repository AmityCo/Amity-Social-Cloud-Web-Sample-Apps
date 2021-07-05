<template>
  <div class="image-file">
    <img :src="fileUrl" :title="alt" :alt="alt" loading="lazy" />
  </div>
</template>

<script>
import { FileRepository } from "@amityco/js-sdk";

export default {
  props: ["fileId", "alt"],

  computed: {
    fileUrl: ({ file }) => {
      if (!file.fileUrl) return null;

      return file.fileUrl.startsWith("blob:")
        ? file.fileUrl
        : `${file.fileUrl}?size=medium`;
    },
  },

  data: () => ({
    file: {},
  }),

  watch: {
    fileId: {
      handler(val) {
        if (this.liveObject) this.liveObject.dispose();
        if (!val) return;

        this.liveObject = FileRepository.getFile(val);

        this.liveObject.on("dataUpdated", (model) => (this.file = model));
        this.file = this.liveObject.model ?? {};
      },
      immediate: true,
    },
  },

  beforeDestroy() {
    this.liveObject?.dispose();
  },
};
</script>

<style lang="scss">
.image-file {
  width: 100%;
  height: 100%;
}

.image-file img {
  display: none;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.image-file img[src] {
  display: block;
}
</style>