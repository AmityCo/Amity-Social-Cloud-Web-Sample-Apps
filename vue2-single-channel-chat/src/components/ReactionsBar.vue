<template>
  <div class="reactions-bar">
    <reaction-button
      :key="reactionName"
      v-for="(count, reactionName) in reactions"
      @click.native="() => toggleReaction(reactionName)"
      :active="myReactions.includes(reactionName)"
      :name="reactionName"
      :count="count"
    />

    <reaction-picker @pick="toggleReaction" />
  </div>
</template>

<script>
import { MessageRepository } from "@amityco/js-sdk";

import ReactionButton from "@/components/ReactionButton";
import ReactionPicker from "@/components/ReactionPicker";

export default {
  components: {
    ReactionButton,
    ReactionPicker,
  },

  props: ["showPicker", "messageId", "reactions", "myReactions"],

  methods: {
    toggleReaction(reactionName) {
      const action = this.myReactions.includes(reactionName)
        ? "removeReaction"
        : "addReaction";

      MessageRepository[action]({
        messageId: this.messageId,
        reactionName,
      });
    },
  },
};
</script>

<style lang="scss">
.reactions-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .25rem;
}
</style>
