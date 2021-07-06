<template>
  <div class="channel-list" :class="{ top }" @scroll="onscroll">
    <channel-item :key="channel.channelId" v-for="channel in channels"
      v-bind="channel"
      :active="channel.channelId === activeChannelId"
      @click.native="() => $emit('click', channel.channelId)"
    />
  </div>
</template>

<script>
import { ChannelRepository, ChannelFilter } from "@amityco/js-sdk";

import ChannelItem from './ChannelItem';

export default {
  components: { ChannelItem },

  props: ['activeChannelId', 'searchQuery'],

  watch: {
    searchQuery: {
      handler(val) {
        this.collection?.dispose()

        this.collection = ChannelRepository.queryChannels({
          keyword: val?.length ? val : undefined,
          filter: val ? ChannelFilter.All : ChannelFilter.Member,
        });

        // Vue specific: there's a bug when trying to make the whole
        // channel model reactive which propagates to the entire sdk
        // so it's necessary to extract the props one by one.
        this.collection.on("dataUpdated", models => {
          this.channels = models.map(({ 
            channelId,
            displayName,
            avatarFileId,
            lastActivity,
            memberCount,
            unreadCount,
           }) => ({ 
            channelId,
            displayName,
            avatarFileId,
            lastActivity,
            memberCount,
            unreadCount,
           }))
        });
      },
      immediate: true,
    },
  },

  data: () => ({
    channels: [],
    top: true,
  }),

  methods: {
    onscroll(e) {
      this.top = e.scrollTop === 0;

      if (!this.collection?.hasMore) return;

      const visibleHeight = e.target.scrollHeight - e.target.clientHeight;

      if (e.target.scrollTop >= visibleHeight - 1) {
        this.collection.nextPage();
      }
    },
  },
}
</script>


<style>
.channel-list {
  width: 100%;
  padding: 0 1rem 1rem;
  border-top: 1px solid #ccd0d5;
}

.channel-list.top {
  border-top: 1px solid transparent;
}

</style>
