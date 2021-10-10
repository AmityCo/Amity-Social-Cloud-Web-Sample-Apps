<template>
  <div class="storyview-header">
    <User class="post-user" :id="id" />
    <a class="story-close-btn" onclick="history.back()">
      <CrossIcon />
    </a>
  </div>
</template>

<script>
import User from "@/components/User";
import CrossIcon from "@/components/icons/CrossIcon";

export default {
  components: { User, CrossIcon },

  computed: {
    id: ({ $route }) => $route.params.userId,
    isMe: ({ $route, $store }) =>
      $route.params.userId == $store.state.user.userId,
  },
};
</script>

<style>
.storyview-header {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  width: 100vw;
  padding: 0 15px;
}
.storyview-header .avatar img {
  border-color: #38be8d;
}
.story-close-btn {
  position: absolute;
  right: 15px;
  top: 3px;
  fill: white;
}
.story-close-btn .icon{
  fill: white !important;
}
</style>