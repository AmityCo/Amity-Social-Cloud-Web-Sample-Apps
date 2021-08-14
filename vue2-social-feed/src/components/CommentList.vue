<template>
  <div class="comments">
    <ul>
      <li :key="id" v-for="id in comments">
        <CommentPreview v-if="inline" :id="id" />
        <Comment v-else :id="id" />
      </li>  
    </ul>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import CommentPreview from '@/components/CommentPreview'

import {
  CommentRepository
} from '@amityco/js-sdk'

export default {
  props: {
    postId: String,
    count: Number,
    inline: Boolean,
  },

  components: {
    Comment,
    CommentPreview,
  },

  data: () => ({
    comments: [],
    parentId: null
  }),

  created() {
    this.commentQuery = CommentRepository.queryComments({
      referenceId: this.postId,
      referenceType: 'post',
      filterByParentId: true,
      last: this.count,
    })
    this.commentQuery.on('dataUpdated', async models => {
      this.comments = models.reverse().map(({ commentId }) => commentId)
    })
  },

  beforeDestroy() {
    this.commentQuery?.dispose()
  },
}
</script>

<style lang="stylus" scoped>
.comments
  position relative
</style>
