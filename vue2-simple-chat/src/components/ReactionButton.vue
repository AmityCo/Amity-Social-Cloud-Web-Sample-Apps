<template>
  <div class="reaction-button" :class="{ active }">{{ emoji }} {{ count }}</div>
</template>

<script>
import { emojify } from "@twuni/emojify";

export default {
  props: ["name", "count", "active"],

  computed: {
    emoji: ({ name }) => emojify(name),
  },
};
</script>

<style lang="scss">
.reaction-button {
  display: inline-block;
  padding: 0.1rem 0.45rem 0.1rem 0.3rem;
  border: 1px solid #eaeaea;
  border-radius: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.reaction-button.active {
  background: #f4f4f4;
}
</style>
