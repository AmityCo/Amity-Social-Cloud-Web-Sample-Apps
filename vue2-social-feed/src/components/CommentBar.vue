<template>
  <form class="commentbar" @submit.prevent="onsubmit">
    <input class="border" type="text" placeholder="Add a comment" v-model="text" />  
  </form>
</template>

<script>
import { CommentRepository } from '@amityco/js-sdk'

export default {
  props: ['postId', 'parentId'],

  data: () => ({
    text: ''
  }),

  methods: {
    onsubmit() {
      CommentRepository.createTextComment({
        referenceId: this.postId,
        referenceType: 'post',
        text: this.text,
      })

      this.text = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.commentbar
  position relative
  display flex
  padding 0rem 1rem 0rem 1rem

  input
    flex 1 1 auto
    padding .5rem 1rem
    border-radius 1rem
</style>
