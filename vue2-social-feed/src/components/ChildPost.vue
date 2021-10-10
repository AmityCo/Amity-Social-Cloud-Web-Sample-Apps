<template>
  <div v-if="!model"></div>
  <div v-else class="child-post">
    <VideoPlayer v-if="model.dataType ==='video'" :id="model.data.videoFileId.original" />
    <Picture v-else :id="model.data.fileId" />
  </div>
</template>

<script>
import Picture from '@/components/Picture'
import VideoPlayer from '@/components/VideoPlayer'

import { PostRepository } from '@amityco/js-sdk'

export default {
  components: { Picture, VideoPlayer },

  props: ['id'],

  data: () => ({
    model: null,
  }),

  created() {
    this.liveObject = PostRepository.postForId(this.id)
    this.liveObject.once('dataUpdated', model => {
      this.model = model;
      })
    this.model = this.liveObject.model
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style lang="stylus" scoped>
.child-post
  position relative
  width 100%
  height 100%
  .picture
    width 100%
    height 100%
</style>
