<template>
  <span v-if="file" class="file-content">
    <strong>{{ name }}</strong>
    <span>{{ size }}</span>
  </span>
</template>

<script>
import { FileRepository } from "@amityco/js-sdk";

import prettyBytes from "pretty-bytes";        

export default {
  props: ['fileId'],

  watch: {
    fileId: {
      handler(val) {
        this.liveObject?.dispose()

        this.liveObject = FileRepository.getFile(val)

        this.liveObject.on('dataUpdated', model => this.file = model)
        if (this.liveObject.model) this.file = this.liveObject.model
      },
      immediate: true,
    }
  },

  computed: {
    name: ({ file }) => file?.attributes.name,
    size: ({ file }) => prettyBytes(file?.attributes.size),
  },

  data: () => ({
    file: null,
  }),

  beforeDestroy() {
    this.liveObject?.dispose()
  },
}
</script>

<style scoped>
.file-content {
  position: relative;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "icon displayname"
    "icon filesize";
  align-items: center;

  grid-gap: 0 0.75rem;
  padding: 0.75rem 1rem 0.75rem 0.75rem;
  color: inherit;
  text-decoration: none; 
}

.file-content svg {
  grid-area: icon;
}

.file-content strong {
  grid-area: displayname;
  font-size: 0.9rem;
}

.file-content span {
  grid-area: filesize;
  font-size: 0.8rem;
}
</style>
