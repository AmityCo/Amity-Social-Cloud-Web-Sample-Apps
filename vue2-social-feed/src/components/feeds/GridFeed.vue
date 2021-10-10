<template>
    <div class = "grid-feed">
      <div :key="post.id" v-for="post in posts" @click="$emit('postClicked',post)">
        <!-- Display the first picture of the post -->
        <ChildPost :id="post.children[0]" />
      </div>  
    </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import ChildPost from '@/components/ChildPost'

export default {
  components: { Avatar, ChildPost },

  props: {
    id: String,
    posts: Array
  },

  computed: {
  },

  data: () => ({
  }),
  methods:{
  },
  created() {
  },

  beforeDestroy() {
  }
}
</script>

<style lang="stylus" scoped>
.grid-feed
  display grid
  grid-template-columns repeat(3, 1fr)
  grid-template-rows max-content
  gap 0.3rem
  div
    width: calc(33.3vw - .2rem);
    height: calc(33.3vw - .2rem);
    overflow: hidden

</style>

