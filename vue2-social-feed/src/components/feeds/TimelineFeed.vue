<template>
  <pull-to :top-load-method="refresh">
    <loader-top-block
      slot="top-block"
      class="pulldown-top"
      slot-scope="props"
      :state="props.state"
    />
    <div class="timeline-feed-container">
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
import Post from "@/components/Post.vue";

export default {
  components: {
    HomeIcon,
    EnvelopeIcon,
    UploadButton,
    Post,
    LoaderTopBlock,
    PullTo,
  },
  props: {
    posts: Array,
  },
  computed: {
    id: ({ $route }) => $route.params.userId,
    nickname: ({ model }) => model?.userId, //model?.displayName ?? model?.userId,
    pullToConfig: () => PULL_TO_CONFIG,
  },
  created() {},
  methods: {
    refresh(loaded) {
      this.$emit("refresh", loaded);
    },
  },
};
</script>

<style lang="stylus" scoped>
.posts ul {
  overflow: auto;
}

.timeline-feed-container {
  height: 100vh;

  ul {
    padding-bottom: 100px;
  }
}
</style>
