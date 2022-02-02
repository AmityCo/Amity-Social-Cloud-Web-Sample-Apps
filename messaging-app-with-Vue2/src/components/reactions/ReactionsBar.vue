<template>
  <div class="reaction-bar">
    <span v-if="reactions.like > 0" class="reaction-medal" style="z-index: 2">
      <like-icon />
    </span>
    <span v-if="reactions.love > 0" class="reaction-medal" style="z-index: 1">
      <love-icon />
    </span>
    <span v-if="reactions.care > 0" class="reaction-medal" style="z-index: 0">
      <care-icon />
    </span>

    <span v-if="reactionsCount > 1" class="reaction-count">
      {{ reactionsCount }}
    </span>
  </div>
</template>

<script>
import LikeIcon from '@/components/icons/LikeIcon'
import LoveIcon from '@/components/icons/LoveIcon'
import CareIcon from '@/components/icons/CareIcon'

export default {
  components: {
    LikeIcon,
    LoveIcon,
    CareIcon,
  },

  props: ['reactions', 'reactionsCount'],
}
</script>

<style>
.reaction-bar {
  display: flex;
  background: #fff;
  border-radius: 4rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
}

.reaction-medal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  padding: 0.1rem;
  background: var(--primary);
  border: 1px solid #fff;
  border-radius: 4rem;
  color: #fff;
}

.reaction-medal > svg {
  height: 0.8rem;
}

.reaction-medal + .reaction-medal {
  margin-left: -0.5rem;
}

.reaction-count {
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 0.25rem;
}

</style>
