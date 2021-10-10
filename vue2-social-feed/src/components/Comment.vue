<template>
  <div v-if="!model && !object"></div>
  <!-- If the comment is the post caption, caption detail will be passed from the parent in `object` -->
  <div v-else-if="object">
    <User v-if="object.userId" :id="object.userId" avatar />
    <CommentPreview :userId="object.userId" :text="object.text" />
    <div class="engagement">
      <span class="timestamp">{{ timeago }}</span>
    </div>
  </div>
  <!-- Else use data from the loaded model -->
  <div v-else class="comment">
    <User v-if="model.userId" :id="model.userId" avatar />

    <CommentPreview :id="id" />

    <div v-if="!inline" class="engagement">
      <span class="timestamp">{{ timeago }}</span>
      <router-link v-if="model.reactionsCount" :to="`/posts/${model.referenceId}/comments/${id}/likes`">
        {{ model.reactionsCount }} like{{ model.reactionsCount !== 1 ? 's' : ''}}
      </router-link>
      <strong>Reply</strong>
    </div>

    <div v-if="!inline" class="like">
      <Heart small :active="liked" @click="toggleReaction" />
    </div>
  </div>
</template>

<script>
import CommentPreview from '@/components/CommentPreview'
import User from '@/components/User'
import Heart from '@/components/Heart'

import { CommentRepository } from '@amityco/js-sdk'
import ta from 'time-ago'

export default {
  components: { CommentPreview, User, Heart },

  props: {
    id: String,
    inline: Boolean,
    object:{
      userId: String,
      text: String,
      createdAt: Number
    }
  },

  data: () => ({
    model: null,
  }),

  computed: {
    liked: ({ model }) => model?.myReactions.includes('like'),
    timeago: ({ model , object}) => ta.ago((object || model)?.createdAt, true),

    likeplural: ({ model }) => model?.reactionsCount !== 1 ? 'likes' : 'like',
  },

  created() {
    console.log("obj IS ",this.object);
    console.log("ID IS ",this.id);
    // If object is not predefined, use the id props to retrieve comment
    if(!this.object){
      this.liveObject = CommentRepository.commentForId(this.id)
      this.liveObject.on('dataUpdated', model => this.model = model)
      this.model = this.liveObject.model
    }
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  },

  methods: {
    addReaction() {
      CommentRepository.addReaction({ commentId: this.id, reactionName: 'like' })
    },

    removeReaction() {
      CommentRepository.removeReaction({ commentId: this.id, reactionName: 'like' })
    },

    toggleReaction() {
      this.liked ? this.removeReaction() : this.addReaction()
    },
  },
}
</script>

<style lang="stylus" scoped>
.comment
  position relative
  display grid
  grid-template-areas 'avatar text like' 'avatar engagement .'
  grid-template-columns min-content 1fr min-content
  grid-gap 0 .5rem
  align-items start
  margin-bottom 1rem

  .avatar
    grid-area avatar

  .comment-preview
    align-self top

  .engagement
    grid-area engagement
    display grid
    grid-template-columns repeat(3, max-content)
    grid-auto-flow column
    grid-gap .5rem
    color #8e8e8e
    font-size .75rem
    margin-top .25rem

    a
      color inherit
      font-weight bold
      text-decoration none


  .like
    grid-area like
    align-self center

</style>
