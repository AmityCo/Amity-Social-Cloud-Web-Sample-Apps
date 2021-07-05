<template>
  <div class="chatroom">
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
