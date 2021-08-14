<template>
  <div v-if="!model"></div>
  <div v-else class="user-detail">
    <div class="user-avatar">
      <Avatar class="large inline" :id="model.avatarFileId" />
    </div>
    <UserStats :posts="postCount" :followers="followerCount" :following="followingCount"  />
    <div class = "user-desc">
      <h4>{{nickname}}</h4>
      <span v-html="bioText"></span>
    </div>
    <UserPanel :id="model.userId"/>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import UserStats from '@/components/users/UserStats'
import UserPanel from '@/components/users/UserPanel'

export default {
  components: { Avatar , UserStats, UserPanel},

  props: {
    model: Object,
    postCount: Number,
    inline: Boolean,
    avatar: Boolean,
  },

  computed: {
    nickname: ({ model }) => model.displayName ?? model.userId,
    bioText: ({model})=>{
      console.log("D",model.description);
      return model.description?.replaceAll(/\n/g,'<br/>')
    },
    followerCount: ({model})=>{
      const userId = model.userId;
      let total = 0;
      for(let i = 0 ; i < userId.length ; i++)
        total += userId.charCodeAt(i);
      return parseInt(total * 1.1);
    },
    followingCount: ({model})=>{
      const displayName = model.displayName || model.userId;
      let total = 0;
      for(let i = 0 ; i < displayName.length ; i++)
        total += displayName.charCodeAt(i);
      return parseInt(total / 1.1);
    }
  },

  created() {
  }
}
</script>

<style lang="stylus" scoped>
.user-detail
  padding 1.7rem 1.2rem
  display grid
  grid-template-columns auto auto auto auto
  grid-template-rows 6rem fit-content(9rem) 3.5rem
  grid-template-areas 'avatar stats stats stats'

  .user-desc
    grid-column 1/5
    h4
      margin-bottom 0.5rem

</style>

