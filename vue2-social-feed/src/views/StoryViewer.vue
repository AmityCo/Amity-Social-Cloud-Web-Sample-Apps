<template>
  <div class="story-viewer-container">
    <div v-if="!model || !stories"></div>
    <vue-social-media-stories
      class="story-viewer"
      v-else
      :stories="stories"
      :loop="true"
      :isPause="true"
      :fullscreenMode="true"
    />
  </div>
</template>

<script>
import VueSocialMediaStories from "../components/stories/vue-social-media-stories";
import StoryViewUserHeader from "../components/stories/StoryViewUserHeader";
import { asynchronize } from "../utils/LiveObjectHelper";
import { loadVideo } from "../utils/VideoHelper";
import {
  UserRepository,
  FeedRepository,
  PostRepository,
  FileRepository,
} from "@amityco/js-sdk";
export default {
  components: {
    VueSocialMediaStories,
    StoryViewUserHeader,
  },

  props: {
    inline: Boolean,
    avatar: Boolean,
  },

  computed: {
    id: ({ $route }) => $route.params.userId,
    isMe: ({ $route, $store }) =>
      $route.params.userId == $store.state.user.userId,
  },

  data: () => ({
    model: null,
    stories: null,
  }),
  methods: {
    userClicked: function (post) {
      this.$router.push({
        path: `/users/${this.id}`,
      });
    },
  },
  updated(){
  },
  async created() {
    this.liveObject?.dispose();
    // Query user information from repository
    this.liveObject = new UserRepository().userForId(this.id);
    this.liveObject.on("dataUpdated", (model) => (this.model = model));
    this.model = this.liveObject.model;

    // Query user posts
    const posts = await asynchronize(
      FeedRepository.getUserFeed({ userId: this.id })
    );
    this.stories = await Promise.all(
      posts
        .filter((post) => post.children?.length > 0)
        .map(async (post) => {
          const childPost = await asynchronize(
            PostRepository.postForId(post.children[0])
          );
          const fileId =
            childPost.dataType === "video"
              ? childPost.data.videoFileId.original
              : childPost.data.fileId;
          const file = await asynchronize(
            FileRepository.fileInformationForId(fileId)
          );
          return {
            url: childPost.dataType === "video" ? file.fileUrl : file.fileUrl+`?size=large`,
            type: childPost.dataType,
            duration:
              childPost.dataType === "video"
                ? (await loadVideo(file.fileUrl)).duration * 1000
                : 5000,
            header: StoryViewUserHeader,
          };
        })
    );
  },

  beforeDestroy() {
    this.liveObject?.dispose();
  },
};
</script>

<style lang="stylus">
.story-viewer-container {
  height: 100vh;
  background: black;
}

.story-viewer>div {
  height: 100vh;
}

.story-viewer button {
  display: none;
}
#social_stories_progress_container{
    background: none;
    position: absolute;
    top: 0;
    width: 100%;
}
#social_stories_container>video, #social_stories_container>img{
  height: 100vh !important;
}
</style>