<template>
  <div :key="key" class="chatroom">
    <channel-header :channelId="channelId" />
    <message-list :channelId="channelId" />
    <message-composer :channelId="channelId" />
  </div>
</template>

<script>
import ChannelHeader from "@/components/channels/ChannelHeader";
import MessageList from "@/components/messages/MessageList";
import MessageComposer from "@/components/composer/MessageComposer";

export default {
  components: {
    ChannelHeader,
    MessageList,
    MessageComposer,
  },

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
    key: Date.now(),
  }),

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
    window.removeEventListener('online', this.refreshKey);
    document.removeEventListener(this.visibilityEvent, this.refreshKey);

    this.refreshKey = null;
  },
};
</script>

<style>
.chatroom {
  display: flex;
  flex-direction: column;
}

.chatroom .channel-header,
.chatroom .message-composer {
  flex: 0 0 auto;
}

.chatroom .message-list {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
