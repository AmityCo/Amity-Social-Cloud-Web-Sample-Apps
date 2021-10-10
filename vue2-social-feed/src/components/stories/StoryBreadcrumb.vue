<template>
  <div class="story-breadcrumb">
    <ul>
        <story-user-item :key="id" :id="id" v-for="id in userIds" v-on:storyClicked="displayStory($event)" />
    </ul>
  </div>
</template>

<script>
import StoryUserItem from './StoryUserItem';
export default {
  components: {StoryUserItem},
  props: {
    userIds: Array,
  },

  methods: {
    displayStory(userId){
      this.$router.push({
        path: `/stories/${userId}`,
      });
    }
  },
};
</script>

<style lang="stylus" scoped>
.story-breadcrumb {
  width: 100%;
  border-bottom: 1px solid #eee;
  overflow-x: scroll;
}

.story-breadcrumb>ul {
  padding: 16px 0px;
  width: max-content;
}
</style>

