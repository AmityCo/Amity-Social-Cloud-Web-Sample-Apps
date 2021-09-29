<template>
  <div class="main" :class="{ overlay }">
      <button @click="overlay = !overlay">
        <template v-if="overlay">...</template>
        <template v-else>╳</template>
      </button>

      <channel-browser v-model="channelId" />
      <chat-room :channelId="channelId" />
    </div>
</template>

<script>
import ChannelBrowser from "@/components/channels/ChannelBrowser";
import ChatRoom from "@/components/ChatRoom";

import {
  ChannelRepository,
  ChannelMembershipRepository,
  ChannelType,
  ChannelMembership,
} from "@amityco/js-sdk";

const DEFAULT_CHANNEL_ID = "simple-chat-demo1";

export default {
  components: { ChannelBrowser, ChatRoom },

  watch: {
    channelId: {
      async handler(newVal, oldVal) {
        if (oldVal) {
          try {
            await ChannelRepository.stopReading(oldVal);
          } catch (err) {}
        }

        await ChannelRepository.joinChannel({
          channelId: newVal,
          type: ChannelType.Community,
        });

        await ChannelRepository.startReading(newVal);

        this.overlay = true;
      },
      immediate: true,
    },

    async loading(val) {
      try {
        const action = val ? 'stopReading' : 'startReading';
        await ChannelRepository[action](this.channelId)
      } catch (err) {}
    },
  },

  data: () => ({
    channelId: DEFAULT_CHANNEL_ID,
    loading: true,
    overlay: true,
  }),
};
</script>

<style>
.main {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main > button {
  z-index: 10;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0.8rem;
  right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  background: none;
  border: none;
  font-size: 1.5rem;
}

.main .channel-browser {
  position: relative;
  z-index: 9;
}

.main.overlay .channel-browser {
  display: none;
}

@media (min-width: 480px) {
  .main {
    grid-template-columns: 6rem 1fr;
    grid-template-rows: 100%;
    grid-template-areas: "channelbrowser chatroom";
  }

  .main > button {
    display: none;
  }

  .main .channel-browser {
    grid-area: channelbrowser;
  }

  .main .chatroom {
    grid-area: chatroom;
  }
}

@media (min-width: 720px) {
  .main {
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 100%;
  }
}
</style>
