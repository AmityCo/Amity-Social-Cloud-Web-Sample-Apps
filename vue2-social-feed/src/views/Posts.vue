<template>
  <MainLayout class="posts">
    <!-- <router-link slot="navleft" to="/posts"><HomeIcon /></router-link> -->
    <!-- <router-link slot="navright" to="/conversations"><EnvelopeIcon /></router-link> -->
    <TimelineFeed :posts="posts" :users="users" :streamUrl="streamUrl" :streamId="streamId" @refresh="refreshData" />
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/Main";

import HomeIcon from "@/components/icons/HomeIcon";
import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import UploadButton from "@/components/UploadButton";
import TimelineFeed from "@/components/feeds/TimelineFeed";
import VueSocialMediaStories from "vue-social-media-stories";
import HeaderTestComponent from "vue-social-media-stories";
import SeemoreTestComponent from "vue-social-media-stories";
import * as _ from "lodash";
import { asynchronize } from "../utils/LiveObjectHelper";

import Post from "@/components/Post.vue";

import { FeedRepository, StreamRepository } from "@amityco/js-sdk";

export default {
  components: {
    MainLayout,
    HomeIcon,
    EnvelopeIcon,
    UploadButton,
    Post,
    TimelineFeed,
    HeaderTestComponent,
    SeemoreTestComponent,
    VueSocialMediaStories,
  },
  props: {},

  data: () => ({
    posts: [],
    users: [],
    streamUrl: null,
    streamId: null
  }),
  methods: {
    async refreshData(loaded) {
      const models = await asynchronize(FeedRepository.getGlobalFeed());
      this.posts.splice(0, this.posts.length);
      this.posts.push(...models.map(({ postId }) => postId));
      this.users = _.uniq(
        ...this.users,
        models.map((post) => post.postedUserId)
      );
      console.log("USERS: ", this.users);
      console.log("POSTS: ", models);

      asynchronize(StreamRepository.queryStreams({isDeleted: false, statuses:['live']})).then(streams=>{
        if(streams?.length > 0){
          this.streamUrl = streams[0].watcherUrl.hls.url;
          this.streamId = streams[0].streamId;
          console.log("STREAMS: ", streams[0]);
        }
      })

      if (loaded) loaded();
    },
  },
  created() {
    this.refreshData();
  },

  beforeDestroy() {
    this.query?.dispose();
  },
};
</script>

<style lang="stylus" scoped>
.posts ul {
  overflow: auto;
}
</style>
