<template>
  <div class="chatroom">
    <div v-if="!isJoined">loading...</div>
    <template v-else>
      <message-list :channelId="channelId" />
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

  data: () => ({
    isJoined: false,
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

  beforeDestroy() {
    this.membership.dispose();
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