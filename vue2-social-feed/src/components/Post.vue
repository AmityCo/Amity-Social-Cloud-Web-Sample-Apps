<template>
  <div v-if="!model"></div>
  <div v-else class="post">
    <User class="post-user" v-if="model.postedUserId" :id="model.postedUserId" />
    <div class="pictures" @click="addReaction">
      <ChildPost :key="child" v-for="child in model.children" :id="child" />
    </div>
    <div class="meta">
      <div class="engagement-bar">
        <Heart :active="liked" @click="toggleReaction" />
        <router-link :to="`/posts/${id}/comments`"><CommentIcon /></router-link>
      </div>
      <div v-if="model.reactionsCount" class="likes"><strong>{{ model.reactionsCount }} like{{ model.reactionsCount !== 1 ? 's' : '' }}</strong></div>
      <div class="text"><strong>{{model.postedUserId}}</strong> {{ model.data.text }}</div>
      <div class="comments">
        <router-link v-if="model.commentsCount" :to="`/posts/${id}/comments`">
          View all {{ model.commentsCount }} comment{{ model.commentsCount !== 1 ? 's' : '' }}
        </router-link>
        <CommentList :postId="id" :count="3" inline />
      </div>
      <div class="timestamp">{{ timeago }}</div>
    </div>
  </div>
</template>

<script>
import User from '@/components/User'
import ChildPost from '@/components/ChildPost'
import Heart from '@/components/Heart'
import CommentIcon from '@/components/icons/CommentIcon'
import CommentList from '@/components/CommentList'
import CommentPreview from '@/components/CommentPreview'

import { PostRepository } from '@amityco/js-sdk'
import ta from 'time-ago'
export default {
  components: { User, ChildPost, Heart, CommentIcon, CommentList },

  props: ['id'],

  data: () => ({
    model: null,
  }),

  created() {
    this.liveObject = PostRepository.postForId(this.id)
    this.liveObject.on('dataUpdated', model =>{
      this.model = model
    })
    this.model = this.liveObject.model
  },

  computed: {
    liked: ({ model }) => model?.myReactions.includes('like'),
    timeago: ({ model }) => ta.ago(model?.createdAt),

    likeplural: ({ model }) => model?.reactionsCount !== 1 ? 'likes' : 'like',

    comment: () => CommentPreview,
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  },

  methods: {
    addReaction() {
      PostRepository.addReaction({ postId: this.id, reactionName: 'like' })
    },

    removeReaction() {
      PostRepository.removeReaction({ postId: this.id, reactionName: 'like' })
    },

    toggleReaction() {
      console.log(this.model);
      this.liked ? this.removeReaction() : this.addReaction()
    },
  },
}
</script>

<style lang="stylus" scoped>
.post
  position relative
  margin-bottom .5rem

  & >>> .user
    padding: 0
  .picture
    background #fff

  .meta, .post-user
    display grid
    grid-template-rows min-content
    grid-auto-flow rows
    grid-gap .3rem
    padding 1rem

  .engagement-bar
    display grid
    grid-template-columns min-content
    grid-auto-flow column
    grid-gap .9rem
    padding-bottom: .1rem

  .comments
    display grid
    grid-template-rows min-content
    grid-auto-flow rows
    grid-gap .25rem

    a
      color #8e8e8e
      text-decoration none

  .timestamp
    color #8e8e8e
    font-size .6rem
    text-transform uppercase
</style>

