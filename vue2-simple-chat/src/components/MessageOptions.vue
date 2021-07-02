<template>
  <b-dropdown
    class="message-options"
    aria-role="list"
    position="is-bottom-left"
    :mobile-modal="false"
  >
    <template #trigger>
      <b-button style="border: none">
        <b-icon class="fontstyle" icon="ellipsis-v" />
      </b-button>
    </template>

    <b-dropdown-item aria-role="listitem" @click="report()">
      <div v-if="!isReported" class="media">
        <b-icon icon="flag" />
        <h3>Report</h3>
      </div>
      <template v-else>You already reported this message.</template>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { MessageRepository } from "@amityco/js-sdk";

export default {
  props: ["messageId"],

  data: () => ({
    isReported: false,
  }),

  beforeMount() {
    MessageRepository.isFlaggedByMe(this.messageId).then(
      (result) => (this.isReported = result)
    );
  },

  methods: {
    async report() {
      await MessageRepository.flag(this.messageId);
      this.isReported = true;
    },
  },
};
</script>

<style lang="scss">
.message-options {
  position: relative;
  z-index: 10;
}

.message-options .dropdown-menu {
  top: 0;
  min-width: 1rem !important;
  text-align: center;
}

.message-options .dropdown.is-top-left .dropdown-menu {
  top: -50%;
}

.message-options .dropdown-item {
  padding: 0.2rem 1rem !important;
}
</style>