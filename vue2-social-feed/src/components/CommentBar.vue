<template>
  <form class="commentbar" @submit.prevent="onsubmit">
    <mentionable-textarea class="border" type="text" placeholder="Add a comment" v-model="text"
      v-on:submit="onsubmit"
     />  
  </form>
</template>

<script>
import { CommentRepository } from '@amityco/js-sdk'
import MentionableTextarea from './MentionableTextarea.vue'

export default {
  components: { MentionableTextarea },
  props: ['postId', 'parentId'],

  data: () => ({
    text: ''
  }),

  methods: {
    onsubmit() {
      console.log("submitting");
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

<style lang="stylus" >
.commentbar
  position relative
  display flex
  padding 0rem 1rem 0rem 1rem

  .mentionable
    flex 1 1 auto
    padding .5rem 1rem
    border-radius 0.3rem
</style>
