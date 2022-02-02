<template>
  <div class="channel-header">
      <h3>{{ channelName }}</h3> • {{ memberCount }} <member-icon />
    </div>
</template>

<script>
import { ChannelRepository } from "@amityco/js-sdk";

import MemberIcon from '@/components/icons/MemberIcon'

export default {
  components: { MemberIcon },

  props: ['channelId'],

  computed: {
    channelName: ({ channelId, displayName }) => displayName ?? channelId,
  },

  watch: {
    channelId: {
      handler(val) {
        this.liveObject?.dispose()
        this.liveObject = ChannelRepository.getChannel(val);

        this.liveObject.on("dataUpdated", model => {
          this.displayName = model.displayName
          this.memberCount = model.memberCount
        });

        if (this.liveObject.model) {
          this.displayName = this.liveObject.model?.displayName
          this.memberCount = this.liveObject.model?.memberCount
        }
      },
      immediate: true,
    }
  },

  data: () => ({
    displayName: null,
    memberCount: 0,
  }),

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style>
.channel-header {
  display: flex;
  align-items: baseline;
  width: 100%;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #ccd0d5;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
}

.channel-header h3 {
  margin: 0;
  margin-right: 0.5rem;
  font-size: 1.17rem;
}

.channel-header svg {
  margin-left: 0.1rem;
}
</style>
