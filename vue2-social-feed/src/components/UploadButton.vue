<template>
  <label class="upload" for="upload">
    <input id="upload" type="file" @input="oninput" :multiple="max>1" :accept="accept" />
    <slot />
  </label>
</template>

<script>

import { FileRepository } from '@amityco/js-sdk'

export default {
  components: {  },
  props:{
    max:{
      type: Number,
      default: 10
    },
    accept:{
      type: String,
      default: "image/*"
    }
  },
  methods: {
    async oninput(e) {
      const files = Array.from(e.target.files)
        .slice(0, this.max)
      this.$emit('uploadStart', files);
      const filesData = await FileRepository.uploadFiles({ files })
      this.$emit('success', filesData)
    },
  },
}
</script>

<style lang="stylus" scoped>
.upload
  position relative
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  padding .5rem 1rem

  input
    position absolute
    z-index -1
    visibility hidden
</style>
