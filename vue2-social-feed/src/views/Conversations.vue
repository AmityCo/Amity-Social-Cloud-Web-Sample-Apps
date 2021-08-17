<template>
  <MainLayout class="conversations" title="Direct">
    <BackButton slot="navleft" />
    <router-link slot="navright" to="/compose"><ComposeIcon /></router-link>
  
    <ul>
      <li :key="channelId" v-for="channelId in channels">
        <router-link
          :to="`/conversations/${channelId}`">
          <Conversation :id="channelId" />
        </router-link>  
      </li>  
    </ul>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main'

import BackButton from '@/components/BackButton'
import ComposeIcon from '@/components/icons/ComposeIcon'

import { ChannelRepository } from '@amityco/js-sdk'

export default {
  components: {
    MainLayout,
    BackButton,
    ComposeIcon,
  },

  data: () => ({
    channels: []
  }),

  created() {
    this.channelQuery = new ChannelRepository().allChannels()

    this.channelQuery.on('dataUpdated', models => {
      const ids = models.map(({ channelId }) => channelId)
        .filter(id => !this.channels.includes(id))

      this.channels.push(...ids)
    })
  },

  beforeDestroy() {
    this.channelQuery.dispose()
  },
}
</script>

<style lang="stylus" scoped>

</style>
