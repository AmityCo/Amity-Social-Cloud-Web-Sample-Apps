<template>
  <div class="attachment">
    <component :is="renderer" :fileId="fileId" />

    <button class="delete" @click="onclick">
      <b-icon class="fontstyle" icon="times-circle" />
    </button>
  </div>
</template>

<script>
import ImageFile from "@/components/ImageFile";
import DownloadableFile from "@/components/DownloadableFile";

export default {
  inheritAttrs: false,

  props: ["fileId", "type"],

  components: { ImageFile, DownloadableFile },

  computed: {
    renderer: ({ type }) => {
      if (type === "image") return "image-file";
      else if (type === "file") return "downloadable-file";
      else return "span";
    },
  },

  methods: {
    onclick() {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="scss" scoped>
.attachment {
  position: relative;
}

.attachment .delete {
  position: absolute;
  top: 2px;
  right: 2px;
  transform: scale(0.8);
}
</style>
