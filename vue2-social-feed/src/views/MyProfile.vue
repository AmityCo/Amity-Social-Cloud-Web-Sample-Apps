<template>
<keep-alive>
  <MainLayout class="user-profile" title=" ">
    <div slot='navleft'><h1 class = "profile-title">{{id}}</h1></div>
    <!-- <BackButton slot="navleft" /> -->  
    <div v-if="!model"></div>
    <div v-else class = "user-profile-grid">
      <MyDetail :model="model" :postCount="posts.length"/>
      <GridFeed :posts="posts" @postClicked="postClicked" />
    </div>
  </MainLayout>
</keep-alive>
</template>

<script>
import MainLayout from '@/layouts/Main'
import BackButton from '@/components/BackButton'
import MyDetail from '@/components/users/MyDetail'
import GridFeed from '@/components/feeds/GridFeed'

import { UserRepository, FeedRepository } from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    BackButton,
    MyDetail,
    GridFeed
  },

  props: {
    inline: Boolean,
    avatar: Boolean,
  },

  computed: {
    id: ({ $store }) => $store.state.user.userId
  },

  data: () => ({
    model: null,
    posts: []
  }),
  methods:{
    postClicked : function(post){
      this.$router.push({
        path: `/users/${this.id}/posts`
      })
    }
  },
  created() {
    // Query user information from repository
    this.liveObject = new UserRepository().userForId(this.id)
    this.liveObject.on('dataUpdated', model => this.model = model)
    this.model = this.liveObject.model

    // Query user posts
    const liveFeed = FeedRepository.getUserFeed({userId: this.id});
    liveFeed.once('dataUpdated', posts => {
      this.posts = posts;
    });
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style lang="stylus" scoped>
.user-profile-grid
  display: grid
  grid-template-rows: fit-content(15rem)
  gap 1.5rem
  overflow-y scroll

.profile-title
  margin 0.8rem 0.5rem
</style>