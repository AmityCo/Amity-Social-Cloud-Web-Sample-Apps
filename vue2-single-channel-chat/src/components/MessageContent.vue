<template>
  <div class="message-content" :class="type">
    <template v-if="type === 'text'">
      {{ data.text }}
    </template>
    <template v-else-if="type === 'image'">
      <div>
        <image-file :fileId="fileId" :alt="data.caption" />
        <em>{{ data.caption }}</em>
      </div>
    </template>
    <template v-else-if="type === 'file'">
      <downloadable-file :fileId="fileId" />
    </template>
    <template v-else>
      <em>Message not supported</em>
    </template>
  </div>
</template>

<script>
import { FileRepository } from "@amityco/js-sdk";

import ImageFile from "@/components/ImageFile";
import DownloadableFile from "@/components/DownloadableFile";

export default {
  inheritAttrs: false,

  props: ["type", "data", "fileId"],
  components: { ImageFile, DownloadableFile },
};
</script>

<style lang="scss">
.message-content.text {
  display: inline;
}

.message-content.image > div {
  display: inline-block;
}

.message-content.image img {
  display: block;
  max-width: 50%;
  max-height: 10rem;
  object-fit: contain;
  object-position: center;
  border-radius: 0.25rem;
  border: 1px solid #eaeaea;
}

.message-content.image em {
  font-size: 0.8rem;
}
</style>