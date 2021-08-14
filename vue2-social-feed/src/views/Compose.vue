<template>
  <MainLayout class="compose" title="New Message">
    <BackButton slot = "navleft" />
    <button slot="navright" @click="onsubmit" :disabled="!Object.keys(selected).length">Next</button>

    <div class="view">
      <form @submit.prevent>
        <div v-if="Object.keys(selected).length" ref="selected" class="selected">
          <UserTag :key="userId" v-for="(displayName, userId) in selected"
            @click="() => removeUser(userId)">
            {{ displayName }}
          </UserTag> 
        </div>

        <input type="text" v-model="text" placeholder="Search..." @input="oninput" />
      </form>

      <div class="users">
        <User :key="user.userId" v-for="user in searchResults" :id="user.userId" @click="() => addUser(user)" />
      </div>
    </div>

  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import BackButton from '@/components/BackButton'
import User from '@/components/User'
import UserTag from '@/components/UserTag'

import { UserRepository } from '@amityco/js-sdk'
export default {
  components: {
    MainLayout,
    BackButton,
    User,
    UserTag,
  },

  data: () => ({
    text: '',
    searchResults: [],
    selected: {},
  }),

  watch: {
    selected() {
      this.$nextTick(() => {
        if (this.$refs.selected)
          this.$refs.selected.scrollLeft = 9999999999
      })
    }
  },

  methods: {
    addUser({ userId, displayName }) {
      if (!(userId in this.selected))
        this.selected = { ...this.selected, [userId]: displayName }
    },

    removeUser(userId) {
      const dump = { ...this.selected }
      delete dump[userId]
      this.selected = dump
    },

    oninput() {
      clearTimeout(this.timer)

      if (!this.text.trim().length)
        this.searchResults = []
      else {
        setTimeout(() => {
          new UserRepository()
            .searchUserByDisplayName(this.text)
            .once('dataUpdated', models => this.searchResults = models)
        }, 200)
      }
    },

    onsubmit() {
      window.alert('sdk endpoint: "createConversation" missing')
      // const conversationId = create conversation
      // this.$router.push({
      //   path: `conversation/${conversationId}`,
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
.compose
  position relative

  button
    background none
    border none
    color #0095f6
    font-size 1rem
    font-weight bold

    &[disabled]
      opacity .4

  form
    align-self start
    display flex
    grid-gap 1rem
    padding 1rem
    background #fff
    border-bottom 1px solid #dbdbdb

    .selected
      flex 0 1 auto
      overflow hidden
      position relative
      display flex
      max-width 40%

      & > *
        flex 0 0 auto

        & + *
          margin-left 1rem



    input
      flex 1 1 auto
      border none
      font inherit

  .users
    display grid
    grid-template-columns 1fr
    grid-auto-flow rows 
    grid-gap 1rem
    padding 1rem

</style>
