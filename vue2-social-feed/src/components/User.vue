<template>
  <div v-if="!model"></div>
  <router-link v-else  :to="`/users/${id}`">
    <div class="user" :class="{ inline }" v-on="$listeners">
        <Avatar v-if="avatar || !inline" :id="model.avatarFileId" />
        <strong v-if="!avatar">{{ nickname }}</strong>
    </div>
  </router-link>
</template>

<script>
import Avatar from '@/components/Avatar'

import { UserRepository } from '@amityco/js-sdk'

export default {
  components: { Avatar },

  props: {
    id: String,
    inline: Boolean,
    avatar: Boolean,
  },

  computed: {
    nickname: ({ model }) => model?.userId
  },

  data: () => ({
    model: null
  }),

  created() {
    this.liveObject = new UserRepository().userForId(this.id)
    this.liveObject.on('dataUpdated', model => this.model = model)
    this.model = this.liveObject.model
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style lang="stylus" scoped>
.user
  position relative
  display grid
  grid-template-columns min-content
  grid-auto-flow column
  align-items center
  grid-gap .75rem

  &.inline
    display inline-grid

  strong 
    flex 1 1 auto
</style>
