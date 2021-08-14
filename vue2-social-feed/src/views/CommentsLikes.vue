<template>
  <MainLayout class="likes" title="Likes">
    <router-link slot="navleft" :to="`/posts/${postId}/comments`"><CrossIcon /></router-link>

    <div class="view">
      api too inconvenient.
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'

import CrossIcon from '@/components/icons/CrossIcon'

import CommentBar from '@/components/CommentBar.vue'
import CommentList from '@/components/CommentList.vue'

import {
  CommentRepository,
} from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    CrossIcon,
    CommentBar,
    CommentList,
  },

  computed: {
    postId: ({ $route }) => $route.params.postId,
    commentId: ({ $route }) => $route.params.commentId,
  },

  data: () => ({
    reactors: []
  }),

  created() {
    /*
    this.query = CommentRepository.queryComments({
      referenceId: this.postId,
      referenceType: 'post',
      filterByParentId: true,
      last: 3,
    })

    this.query.on('dataUpdated', async models => {
      this.comments.push(
        ...comments.map(({ commentId }) => commentId)
      )
    })
    */
  },

  beforeDestroy() {
    //this.query?.dispose()
  },
}
</script>

<style lang="stylus" scoped>
.likes
  position relative
</style>
