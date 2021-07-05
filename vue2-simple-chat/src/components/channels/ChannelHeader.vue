<template>
  <div class="channel-header">
      <h3>{{ channelName }}</h3>
    </div>
</template>

<script>
import { ChannelRepository } from "@amityco/js-sdk";

export default {
  props: ['channelId'],

  computed: {
    channelName: ({ channelId, displayName }) => displayName ?? channelId,
  },

  watch: {
    channelId: {
      handler(val) {
        this.liveObject?.dispose()
        this.liveObject = ChannelRepository.getChannel(val);

        this.liveObject.on("dataUpdated", model => this.displayName = model.displayName);
        if (this.liveObject.model) this.displayName = this.liveObject.model?.displayName;
      },
      immediate: true,
    }
  },

  data: () => ({
    displayName: null,
  }),

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style>
.channel-header {
  width: 100%;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #ccd0d5;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
}

.channel-header h3 {
  margin: 0;
}
</style>
