<template>
  <MainLayout class="posts">
    <!-- <router-link slot="navleft" to="/posts"><HomeIcon /></router-link> -->
    <!-- <router-link slot="navright" to="/conversations"><EnvelopeIcon /></router-link> -->

    <TimelineFeed :posts="posts" @refresh="refreshData"/>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'

import HomeIcon from '@/components/icons/HomeIcon'
import EnvelopeIcon from '@/components/icons/EnvelopeIcon'
import UploadButton from '@/components/UploadButton'
import TimelineFeed from '@/components/feeds/TimelineFeed'

import Post from '@/components/Post.vue'

import {
  FeedRepository,
  PostRepository,
} from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    HomeIcon,
    EnvelopeIcon,
    UploadButton,
    Post,
    TimelineFeed
  },

  data: () => ({
    posts: []
  }),
  methods:{
    refreshData(loaded){
      this.query = FeedRepository.getGlobalFeed()
      this.query.on('dataUpdated', async models => {
        // filter out posts with no children (since images are only at child position)
        // const postsWithChildren = models.filter(({ children }) => children.length)

        // // for posts with children
        // const postsWithChildType = await Promise.all(
        //   postsWithChildren.map((model) => (
        //     new Promise(resolve => {
        //       // query the first child
        //       PostRepository
        //         .postForId(model.children[0])
        //         .once('dataUpdated', child => resolve({
        //           model, isImage: child.dataType === 'image'
        //         }))
        //     })
        //   ))
        // )

        // // finally filter out posts with non image children
        // const postsWithImage = postsWithChildType
        //   .filter(({ isImage }) => isImage)
        //   .map(({ model }) => model)

        this.posts.splice(0, this.posts.length)
        this.posts.push(
          ...models.map(({ postId }) => postId)
        )
        if(loaded) loaded();
      })
    }
  },
  created() {
    this.refreshData();
  },

  beforeDestroy() {
    this.query?.dispose()
  }
}
</script>

<style lang="stylus" scoped>
.posts ul
    overflow auto
</style>
