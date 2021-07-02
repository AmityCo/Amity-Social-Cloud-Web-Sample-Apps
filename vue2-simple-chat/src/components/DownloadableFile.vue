<template>
  <a class="downloadable-file" :href="fileUrl" download target="_blank">
    <strong>{{ name }}</strong>
    {{ size }}
  </a>
</template>

<script>
import { FileRepository } from "@amityco/js-sdk";

import prettyBytes from "pretty-bytes";

export default {
  props: ["fileId"],

  computed: {
    fileUrl: ({ file }) => file.fileUrl,
    name: ({ file }) => file.attributes?.name ?? "unknown file",
    size: ({ file }) =>
      file.attributes?.size ? prettyBytes(file.attributes.size) : "0",
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
.downloadable-file {
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid #eaeaea;
  border-radius: 0.25rem;
  font-size: 0.8rem;
}

.downloadable-file strong {
  display: block;
}
</style>