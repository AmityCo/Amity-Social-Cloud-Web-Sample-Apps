<template>
  <MainLayout class="user-profile" :title="id">
    <BackButton slot="navleft" />
    <div v-if="!model || !posts"></div>
    <div v-else class = "user-profile-grid">
      <pull-to :top-load-method="refresh" >
        <loader-top-block slot="top-block" class="pulldown-top" slot-scope="props" :state="props.state" />
        <MyDetail v-if="isMe" :model="model" :postCount="posts.length" />
        <UserDetail v-else :model="model" :postCount="posts.length" />
        <GridFeed :posts="posts" @postClicked="postClicked" />
      </pull-to>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import BackButton from '@/components/BackButton'
import UserDetail from '@/components/users/UserDetail'
import MyDetail from '@/components/users/MyDetail'
import GridFeed from '@/components/feeds/GridFeed'
import LoaderTopBlock from '@/components/feeds/LoaderTopBlock'

import { UserRepository, FeedRepository } from '@amityco/js-sdk'

import PullTo from 'vue-pull-to'
export default {
  components: {
    MainLayout,
    BackButton,
    UserDetail,
    MyDetail,
    GridFeed,
    PullTo,
    LoaderTopBlock
  },

  props: {
    inline: Boolean,
    avatar: Boolean,
  },

  computed: {
    id: ({ $route }) => $route.params.userId,
    isMe: ({$route, $store}) => $route.params.userId == $store.state.user.userId
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
    },
    refresh(loaded) {
      this.liveObject?.dispose()
      // Query user information from repository
      this.liveObject = new UserRepository().userForId(this.id)
      this.liveObject.on('dataUpdated', model => this.model = model)
      this.model = this.liveObject.model

      // Query user posts
      const liveFeed = FeedRepository.getUserFeed({userId: this.id});
      liveFeed.once('dataUpdated', posts => {
        this.posts = posts;
        if(loaded)loaded();
      });
      this.posts = liveFeed.models
    }
  },
  created() {
    this.refresh()
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