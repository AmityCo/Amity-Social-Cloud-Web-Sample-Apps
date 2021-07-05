<template>
  <div
    class="message-item"
    :class="hover"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="header">
      <user-header :userId="message.userId" />
      <sync-state :value="message.syncState" />
    </div>

    <message-content v-bind="message" />
    <message-options :messageId="message.messageId" />

    <reactions-bar
      :messageId="message.messageId"
      :reactions="message.reactions"
      :myReactions="message.myReactions"
      :showPicker="false"
    />
  </div>
</template>

<script>
import UserHeader from "@/components/UserHeader";
import SyncState from "@/components/SyncState";
import MessageContent from "@/components/MessageContent";
import MessageOptions from "@/components/MessageOptions";
import ReactionsBar from "@/components/ReactionsBar";

export default {
  components: {
    UserHeader,
    SyncState,
    MessageContent,
    MessageOptions,
    ReactionsBar,
  },

  props: ["message"],

  data: () => ({
    hover: false,
  }),
};
</script>

<style lang="scss">
.message-item {
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: min-content auto min-content;
  grid-template-areas: "header options" "content options" "reactions .";
  grid-gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}

.message-item.hover {
  z-index: 100;
}

.message-item > .header {
  grid-area: header;
}

.message-item > .message-content {
  grid-area: content;
}

.message-item .message-options {
  grid-area: options;
}

.message-item .reactions-bar {
  grid-area: reactions;
}
</style>
