<template>
  <MainLayout class="user-posts" title="Posts" :supertitle="nickname">
    
    <BackButton slot="navleft" />

    <TimelineFeed :posts="posts" />

  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'

import HomeIcon from '@/components/icons/HomeIcon'
import EnvelopeIcon from '@/components/icons/EnvelopeIcon'
import UploadButton from '@/components/UploadButton'
import TimelineFeed from '@/components/feeds/TimelineFeed'
import BackButton from '@/components/BackButton'

import Post from '@/components/Post.vue'

import {
  FeedRepository,
  PostRepository,
  UserRepository
} from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    HomeIcon,
    EnvelopeIcon,
    UploadButton,
    Post,
    TimelineFeed,
    BackButton
  },

  computed: {
    id: ({ $route }) => $route.params.userId,
    nickname: ({ model }) => model?.userId //model?.displayName ?? model?.userId
  },

  data: () => ({
    model: null,
    posts: []
  }),

  created() {

    // Query user information from repository
    this.liveObject = new UserRepository().userForId(this.id)
    this.liveObject.on('dataUpdated', model => this.model = model)
    this.model = this.liveObject.model

    // Query user posts
    this.query = FeedRepository.getUserFeed({userId: this.id});
    this.query.on('dataUpdated', async models => {
      this.setModels(models);
    });
    if(this.query.models){
      this.setModels(this.query.models);
    }
  },

  beforeDestroy() {
    this.query?.dispose()
  },

  methods: {
    onupload(files) {
      const str = JSON.stringify(files)
      const b64 = btoa(str)

      this.$router.push({
        path: '/create',
        query: { data: b64 },
      })
    },
    async setModels(models){
      // Filter only for image posts (posts with children)
      const postsWithChildren = models.filter(({ children }) => children.length)

      // for posts with children
      const postsWithChildType = await Promise.all(
        postsWithChildren.map((model) => (
          new Promise(resolve => {
            // query the first child
            PostRepository
              .postForId(model.children[0])
              .once('dataUpdated', child => resolve({
                model, isImage: child.dataType === 'image'
              }))
          })
        ))
      )

      // finally filter out posts with non image children
      const postsWithImage = postsWithChildType
        .filter(({ isImage }) => isImage)
        .map(({ model }) => model)

      this.posts.push(
        ...postsWithImage.map(({ postId }) => postId)
      )
    }
  },
}
</script>

<style lang="stylus" scoped>
.posts ul
    overflow auto
</style>
