<template>
  <pull-to :top-load-method="refresh">
    <loader-top-block
      slot="top-block"
      class="pulldown-top"
      slot-scope="props"
      :state="props.state"
    />
    <div class="timeline-feed-container">
      <story-breadcrumb :userIds="users"/>
      <HLSPlayer v-if="streamUrl" :streamUrl="streamUrl" :livechatUrl="livechatUrl"  />
      <ul>
        <li :key="id" v-for="id in posts">
          <Post :id="id" />
        </li>
      </ul>
    </div>
  </pull-to>
</template>

<script>
import PullTo from "vue-pull-to";
import HomeIcon from "@/components/icons/HomeIcon";
import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import UploadButton from "@/components/UploadButton";
import LoaderTopBlock from "@/components/feeds/LoaderTopBlock";
import StoryBreadcrumb from "@/components/stories/StoryBreadcrumb";
import Post from "@/components/Post.vue";
import HLSPlayer from '../HLSPlayer.vue';

export default {
  components: {
    HomeIcon,
    EnvelopeIcon,
    UploadButton,
    Post,
    LoaderTopBlock,
    StoryBreadcrumb,
    PullTo,
    HLSPlayer
  },
  props: {
    users: Array,
    posts: Array,
    streamUrl: String,
    streamId: String
  },
  computed: {
    id: ({ $route }) => $route.params.userId,
    pullToConfig: () => PULL_TO_CONFIG,
    livechatUrl({$store}){
      console.log("THIS ",$store);
      return `${process.env.VUE_APP_LIVECHAT_ROOT_URL}/?streamId=${this.streamId}&userId=${$store.state.user.userId}`
    }
  },
  created() {},
  methods: {
    refresh(loaded) {
      this.$emit("refresh", loaded);
    },
  }
};
</script>

<style lang="stylus" scoped>
.posts ul {
  overflow: auto;
  width: 100%;
}

.timeline-feed-container {
  height: 100vh;

  ul {
    padding-bottom: 100px;
  }
}
</style>
