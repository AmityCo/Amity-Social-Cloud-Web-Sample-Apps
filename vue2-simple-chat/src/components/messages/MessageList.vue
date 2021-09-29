<template>
  <div class="message-list">
    <div ref="messages" class="message-area" @scroll="onscroll">
      <message-item
        :key="message.messageId"
        v-for="message in messages"
        v-bind="message"
      />
      <div v-if="loading" class="svg">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import { MessageRepository } from "@amityco/js-sdk";

import Loader from "@/components/icons/Loader";
import MessageItem from "./MessageItem";

export default {
  components: { Loader, MessageItem },

  props: ["channelId"],

  data: () => ({
    messages: [],
    loading: false,
  }),

  watch: {
    channelId: {
      handler(val) {
        this.liveCollection?.dispose()

        this.loading = true;
        this.messages = [];

        this.liveCollection = MessageRepository.queryMessages({
          channelId: val,
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
      immediate: true,
    },
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

<style>
.message-list {
  position: relative;
}

.message-area {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  overflow: auto;
}

.message-area .svg {
  display: block;
  margin: 0 auto 1rem;
}

</style>
