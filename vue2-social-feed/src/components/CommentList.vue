<template>
  <div class="comments">
    <ul>
      <li :key="comment.commentId" v-for="comment in comments">
        <CommentPreview v-if="inline" :id="comment.commentId" />
        <Comment v-else :id="comment.commentId" />
      </li>  
    </ul>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import CommentPreview from '@/components/CommentPreview'
import {asynchronize} from "../utils/LiveObjectHelper"

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

  async created() {
    this.comments = await asynchronize(CommentRepository.queryComments({
      referenceId: this.postId,
      referenceType: 'post',
      filterByParentId: true,
      last: this.count,
    }));
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
