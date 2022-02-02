<template>
  <span class="reaction-picker">
    <span @click.prevent.stop="open = !open">React</span>
    <div v-if="open" class="reaction-buttons">
      <button
        :key="reaction"
        v-for="reaction in reactions"
        :rel="reaction"
        class="reaction-button"
        :class="{ active: myReactions.includes(reaction) }"
        @click.prevent.stop="() => toggleReaction(reaction)">
        <like-icon v-if="reaction === 'like'" />
        <love-icon v-else-if="reaction === 'love'" />
        <care-icon v-if="reaction === 'care'" />
      </button>
    </div>
  </span>
</template>

<script>
import { MessageRepository } from '@amityco/js-sdk';

import LikeIcon from '@/components/icons/LikeIcon'
import LoveIcon from '@/components/icons/LoveIcon'
import CareIcon from '@/components/icons/CareIcon'

export default {
  components: {
    LikeIcon,
    LoveIcon,
    CareIcon,
  },

  props: ['messageId', 'myReactions'],

  data: () => ({
    open: false,
  }),

  computed: {
    reactions: () => (['like', 'love', 'care'])
  },

  mounted() {
    this.listener = (e) => {
      if (!this.$el.contains(e.target)) this.open = false;
    };

    document.addEventListener("click", this.listener);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.listener);
  },

  methods: {
    async toggleReaction(reactionName) {
      if (!this.open) return;

      const action = this.myReactions.includes(reactionName)
        ? "removeReaction"
        : "addReaction";

      await MessageRepository[action]({
        messageId: this.messageId,
        reactionName,
      });

      this.open = false;
    }
  }
}
</script>

<style>
.reaction-picker {
  position: relative;
  color: #636878;
  font-size: 0.7rem;
}

.reaction-picker > span {
  cursor: pointer;
}

.reaction-picker .reaction-buttons {
  z-index: 5;
  position: absolute;
  display: flex;
  align-items: center;
  grid-gap: 0.75rem;
  bottom: 50%;
  left: 50%;
  padding: 0.5rem 0.75rem 0.5rem 0.875rem;
  background: #fff;
  border-radius: 4rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  color: #898e9e;
}

.reaction-picker .reaction-buttons > button {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  transition: all 0.2s;
}

.reaction-picker .reaction-buttons > button.active {
  color: var(--primary);
}

.reaction-picker .reaction-buttons > button:hover {
  opacity: 0.5;
}

</style>
