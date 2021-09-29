<template>
  <div class="message-list">
    <div ref="messages" class="message-area" @scroll="onscroll">
      <message-item
        :key="message.messageId"
        v-for="message in messages"
        :message="message"
      />
      <div class="svg">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import { MessageRepository } from "@amityco/js-sdk";

import Loader from "@/components/Loader";
import MessageItem from "@/components/MessageItem";

export default {
  components: { Loader, MessageItem },

  props: ["channelId"],

  data: () => ({
    messages: [],
    loading: false,
  }),

  beforeMount() {
    this.loading = true;

    this.liveCollection = MessageRepository.queryMessages({
      channelId: this.channelId,
      isDeleted: false,
    });

    this.liveCollection.on("dataUpdated", (messages) => {
      this.messages = messages.reverse();
      this.loading = false;
    });

    if (this.liveCollection.models?.length)
      this.messages = this.liveCollection.models.reverse();

    this.liveCollection.on("dataError", (error) => {
      console.log("The message live collection encountered an error", error);
    });
  },

  beforeDestroy() {
    this.liveCollection?.dispose();
  },

  methods: {
    onscroll(e) {
      if (!this.liveCollection.prevPage) return;

      const el = this.$refs.messages;

      const top = el.scrollHeight - el.clientHeight;
      const scroll = -el.scrollTop; // reversed because of the flex direction

      if (top - scroll <= 1) {
        this.loading = true;
        this.liveCollection.prevPage();
      }
    },
  },
};
</script>

<style lang="scss">
.message-list {
  position: relative;
}

.message-area {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column-reverse;
  overflow: auto;
}

.message-area .svg {
  display: block;
  margin: 1rem auto;
}

</style>
