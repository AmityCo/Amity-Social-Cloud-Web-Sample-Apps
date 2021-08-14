<template>
  <div class="user-stats">
    <div class="user-stat-post">
      <h3>{{ postsText }}</h3>
      <h4>Posts</h4>
    </div>
    <div class="user-stat-follower">
      <h3>{{ followersText }}</h3>
      <h4>Followers</h4>
    </div>
    <div class="user-stat-following">
      <h3>{{ followingText }}</h3>
      <h4>Following</h4>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import numberAbbreviate from "number-abbreviate";
import commaNumber from "comma-number";

export default {
  components: { Avatar },
  props: {
    followers: Number,
    posts: Number,
    following: Number,
  },
  methods: {
    format(number) {
      return number < 10000
        ? commaNumber(parseInt(number))
        : numberAbbreviate(parseInt(number), 1).toString().toUpperCase();
    },
  },
  computed: {
    followersText: ({ format, followers }) => format(followers),
    postsText: ({ format, following }) => format(following),
    followingText: ({ format, posts }) => format(posts),
  },
};
</script>

<style lang="stylus" scoped>
.user-stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: auto;
  padding-left: 2rem;
  padding-right: 1.5rem;
  justify-content: space-evenly;
  gap: 0.5rem;

  div {
    text-align: center;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.15rem;
      font-weight: 700;
    }

    h4 {
      font-size: 1.05rem;
      margin-top: 0;
      font-weight: normal;
    }
  }
}
</style>

