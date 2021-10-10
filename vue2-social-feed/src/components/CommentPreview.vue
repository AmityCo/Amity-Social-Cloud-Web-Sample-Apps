<template>
  <div v-if="!model"></div>
  <div v-else class="comment-preview">
    <User v-if="model.userId" :id="model.userId" inline />&nbsp;
    <mentionable-text :text="model.text || model.data.text" />
  </div>
</template>

<script>
import User from '@/components/User'

import { CommentRepository } from '@amityco/js-sdk'
import MentionableText from './MentionableText.vue'

export default {
  components: { MentionableText, User },

  props: {
    id: String,
    text: String,
    userId: String,
  },

  data(){
    const { userId, text } = this
    const model = (userId && text) ? { userId, text } : null
    return { model }
  },

  created() {
    // If object is not predefined, use the id props to retrieve comment
    if(!this.userId){
      this.liveObject = CommentRepository.commentForId(this.id)
      this.liveObject.on('dataUpdated', model => this.model = model)
      this.model = this.liveObject.model
    }
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  },
}
</script>

<style lang="stylus" scoped>
.comment-preview
  position relative
  margin-top .2rem

  .user
    display inline
    margin-right .1rem
</style>
