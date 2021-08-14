<template>
  <MainLayout class="create" title="New Post">
    <BackButton slot="navleft" />
    <button slot="navright" @click="onsubmit">Share</button>

    <form @submit.prevent>
      <Avatar :id="this.userId" />
      <textarea type="text" v-model="text" placeholder="Write a caption..."></textarea>
      <img :src="fileUrl" />
    </form>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import BackButton from '@/components/BackButton'
import Avatar from '@/components/Avatar'

import { PostRepository } from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    BackButton,
    Avatar
  },

  computed: {
    files: ({ $route }) => {
      const b64 = $route?.query?.data ?? ''
      const str = atob(b64)

      try {
        return JSON.parse(str)
      } catch {
        return []
      }
    },

    file: ({ files }) => files?.[0],
    fileId: ({ file }) => file?.fileId,
    fileUrl: ({ file }) => file?.fileUrl,

    userId: ({ $store }) => $store.state.user?.userId,
  },

  data: () => ({
    text: ''
  }),

  methods: {
    onsubmit() {
      const post = PostRepository.createPost({
        targetId: this.userId,
        targetType: 'user',
        data: {
          text: this.text,
          images: [this.fileId],
        },
      })

      // post created, nothing more to do
      post.once('dataUpdated', () => {
        this.$router.push('/posts')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  position relative

  button
    background none
    border none
    color var(--textColor)
    font-size 1rem
    font-weight bold

  form
    align-self start
    display flex
    gap 1rem
    background var(--schemeColor)
    border-bottom 1px solid var(--borderColor)
    padding 1rem

    textarea
      flex 5 0 auto
      min-height 4rem
      border none
      resize none
      font inherit

    img
      flex 0 1 auto
      max-width 25%
      object-fit contain 
      object-position center
</style>
