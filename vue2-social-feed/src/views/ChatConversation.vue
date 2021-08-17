<template>
  <MainLayout class="chat-conversation" :title="id">
    <BackButton slot="navleft" />
    <div v-if="!model || !posts"></div>
    <div v-else class = "user-profile-grid">
      <UserDetail :model="model" :postCount="posts.length" />
      <GridFeed :posts="posts" @postClicked="postClicked" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import BackButton from '@/components/BackButton'
import UserDetail from '@/components/users/UserDetail'
import GridFeed from '@/components/feeds/GridFeed'

import { UserRepository, FeedRepository } from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    BackButton,
    UserDetail,
    GridFeed
  },

  props: {
    inline: Boolean,
    avatar: Boolean,
  },

  computed: {
    id: ({ $route }) => $route.params.userId
  },

  data: () => ({
    model: null,
    posts: null
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

    // Query user posts
    const liveFeed = FeedRepository.getUserFeed({userId: this.id});
    liveFeed.once('dataUpdated', posts => {
      this.posts = posts;
    });
    this.model = this.liveObject.model
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
  gap 2.5rem
  overflow-y scroll
</style>