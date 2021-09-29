<template>
  <div class="chatroom">
    <div v-if="!isJoined">loading...</div>
    <template v-else>
      <message-list :key="key" :channelId="channelId" />
      <message-composer :channelId="channelId" />
    </template>
  </div>
</template>

<script>
import {
  ChannelRepository,
  ChannelMembershipRepository,
} from "@amityco/js-sdk";

import MessageList from "@/components/MessageList";
import MessageComposer from "@/components/MessageComposer";

export default {
  components: { MessageList, MessageComposer },

  props: ["channelId"],

  computed: {
    hiddenProp: () => {
      return ['hidden', 'msHidden', 'webkitHidden']
        .find(prop => prop in document)
    },
    visibilityEvent: ({ hiddenProp }) => {
      return ({
        hidden: "visibilitychange",
        msHidden: "msvisibilitychange",
        webkitHidden: "webkitvisibilitychange",
      })[hiddenProp]
    },
  },

  data: () => ({
    isJoined: false,
    key: Date.now(),
  }),

  async beforeMount() {
    const channelUser = new ChannelMembershipRepository(this.channelId);

    this.membership = channelUser.myMembership;

    const callback = (model) => {
      this.isJoined = model.membership = "member";
    };

    this.membership?.on("dataUpdated", callback);
    this.membership?.model && callback(this.membership.model);

    await ChannelRepository.joinChannel({
      channelId: this.channelId,
      type: "community",
    });
  },

  mounted() {
    this.refreshKey = () => {
      // internet is back && page not hidden
      if (navigator.onLine && !document[this.hiddenProp])
        this.key = Date.now();
    }

    // listen for connectivity back online
    window.addEventListener('online', this.refreshKey);

    // listen for page coming back in front
    document.addEventListener(this.visibilityEvent, this.refreshKey);
  },

  beforeDestroy() {
    this.membership.dispose();

    window.removeEventListener('online', this.refreshKey);
    document.removeEventListener(this.visibilityEvent, this.refreshKey);

    this.refreshKey = null;
  },
};
</script>

<style lang="scss">
.chatroom {
  overflow: hidden;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: calc(100% - 3rem) min-content;
  width: 100vw;
  height: 100vh;
}
</style>
