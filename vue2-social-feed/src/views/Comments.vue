<template>
  <MainLayout class="comments" title="Comments">
    <BackButton slot="navleft" />
    <!-- <router-link slot="navright" to="/conversations"><EnvelopeIcon /></router-link> -->

    <div v-if="post" class="view">

      <Comment class = "comment post-caption" :object="post" />
      <CommentList class="list" :postId="postId" />
      <CommentBar :postId="postId" :parentId="parentId" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'

import BackButton from '@/components/BackButton'
import EnvelopeIcon from '@/components/icons/EnvelopeIcon'
import UploadButton from '@/components/UploadButton'

import CommentBar from '@/components/CommentBar.vue'
import CommentList from '@/components/CommentList.vue'
import Comment from '@/components/Comment.vue'
import User from '@/components/User.vue'

import {
  CommentRepository,
  PostRepository
} from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    BackButton,
    EnvelopeIcon,
    UploadButton,
    CommentBar,
    CommentList,
    User,
    Comment
  },

  computed: {
    postId: ({ $route }) => $route.params.postId
  },

  data: () => ({
    comments: [],
    post: null,
    parentId: null
  }),
  methods:{
    setPostData(postModel){
      this.post = {
        userId: postModel.postedUserId,
        createdAt: postModel.createdAt,
        text: postModel.data.text
      }
    }
  },
  created() {
    this.postQuery = PostRepository.postForId(this.postId);
    this.postQuery.on('dataUpdated', this.setPostData);
    if(this.postQuery.model)
      this.setPostData(this.postQuery.model);
    this.query = CommentRepository.queryComments({
      referenceId: this.postId,
      referenceType: 'post',
      filterByParentId: true,
      last: 3,
    })

    this.query.on('dataUpdated', async models => {
      this.comments.push(
        ...models.map(({ commentId }) => commentId)
      )
    })
  },

  beforeDestroy() {
    this.query?.dispose()
    this.postQuery?.dispose()
  },
}
</script>

<style lang="stylus" scoped>
.post-caption
  padding 1rem
  margin-bottom 0

.comments .list
    overflow auto
    padding 0.5rem
</style>
