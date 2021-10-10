<template>
  <li v-if="model" class = "story-useritem" v-on:click="$emit('storyClicked', id)">
    <div class="user">
        <Avatar :id="model.avatarFileId" />
    </div>
    <div class="displayname">{{nickname}}</div>
  </li>
</template>

<script>
import Avatar from '@/components/Avatar'

import { UserRepository } from '@amityco/js-sdk'
export default {
  components: { Avatar },
  props: {
    id: String,
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

  methods: {},
};
</script>

<style lang="stylus" scoped>
.story-useritem {
  margin: 0px 10px;
  display: inline-block;
  width: 66px;
  vertical-align: top;
}

.story-useritem .avatar {
  width: 66px;
  height: 66px;
  margin: auto;
  border: 2px solid #38be8d;
}

.story-useritem .displayname {
  width: 66px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 7px;
  text-align: center;
}
</style>

