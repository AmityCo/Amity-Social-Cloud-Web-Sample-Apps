<template>
  <MainLayout class="create" title="New Post">
    <BackButton slot="navleft" />
    <button slot="navright" @click="onsubmit">Share</button>

    <form @submit.prevent>
      <div>
          <MentionableTextarea
            v-model="text"
            placeholder="Write a caption..."
          />
      </div>
      <video v-if="isVideo()" :src="fileUrl" autoplay muted loop/>
      <img v-else :src="fileUrl" />
    </form>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/Main";
import BackButton from "@/components/BackButton";
import Avatar from "@/components/Avatar";
import { Mentionable } from "vue-mention";
import { PostRepository } from "@amityco/js-sdk";
import MentionableTextarea from '../components/MentionableTextarea';

export default {
  components: {
    MainLayout,
    BackButton,
    Avatar,
    MentionableTextarea,
  },

  computed: {
    files: ({ $route }) => {
      const b64 = $route?.query?.data ?? "";
      const str = atob(b64);

      try {
        return JSON.parse(str);
      } catch {
        return [];
      }
    },

    file: ({ files }) => files?.[0],
    fileId: ({ file }) => file?.fileId,
    fileUrl: ({ file }) => file?.fileUrl,

    userId: ({ $store }) => $store.state.user?.userId,
  },

  data: () => ({
    text: "",
    items: [
      {
        value: "cat",
        label: "Mr Cat",
      },
      {
        value: "dog",
        label: "Mr Dog",
      },
    ],
  }),

  methods: {
    isVideo(){
      return this.file.attributes.mimeType.startsWith("video")
    },
    onsubmit() {
      const post = this.isVideo()
        ? PostRepository.createPost({
            targetId: this.userId,
            targetType: "user",
            data: {
              text: this.text,
            },
            attachments: [{ fileId: this.fileId, type: "video" }],
          })
        : PostRepository.createPost({
            targetId: this.userId,
            targetType: "user",
            data: {
              text: this.text,
            },
            attachments: [{ fileId: this.fileId, type: "image" }],
          });

      // post created, nothing more to do
      post.once("dataUpdated", () => {
        this.$router.push("/posts");
      });
    },
  },
};
</script>

<style lang="stylus">
.create {
  position: relative;

  button {
    background: none;
    border: none;
    color: var(--textColor);
    font-size: 1rem;
    font-weight: bold;
  }

  form {
    align-self: start;
    display: flex;
    gap: 1rem;
    background: var(--schemeColor);
    border-bottom: 1px solid var(--borderColor);
    padding: 1rem;

    textarea {
      flex: 5 0 auto;
      min-height: 4rem;
      border: none;
      resize: none;
      font: inherit;
      width: 65vw;
    }

    img, video {
      flex: 0 1 auto;
      max-width: 25vw;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
