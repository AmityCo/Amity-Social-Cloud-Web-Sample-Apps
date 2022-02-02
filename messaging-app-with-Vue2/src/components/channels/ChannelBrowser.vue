<template>
  <div class="channel-browser">
    <div class="header">
      <h2>Chats</h2>
      <input
        type="search"
        v-model="inputText"
        placeholder="Search a channel..."
      />
    </div>

    <channel-list
      :activeChannelId="value"
      :searchQuery="searchQuery"
      @click="val => $emit('input', val)"
    />
  </div>
</template>

<script>
import ChannelList from './ChannelList'

export default {
  components: { ChannelList },

  props: ["value"],

  watch: {
    inputText(val) {
      clearTimeout(this.timer)
      setTimeout(() => this.searchQuery = val, 200)
    },
  },

  data: () => ({
    inputText: '',
    searchQuery: '',
  }),
}
</script>

<style>
.channel-browser {
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
}

.channel-browser .header {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 1rem;
  margin: 0 1rem;
  padding: 0.8rem 0;
}

.channel-browser h2 {
  margin: 0;
}

.channel-browser input {
  display: none;
  width: 100%;
  padding: 0.6rem 1.2rem;
  border: 1px solid #ccd0d5;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.channel-browser .channel-list {
  flex: 1 1 auto;
  overflow: auto;
}

@media (min-width: 480px) {
  .channel-browser {
    z-index: 1;
    position: relative;
    display: flex !important;
    width: auto;
    border-right: 1px solid #ccd0d5;
  }
}

@media (min-width: 720px) {
  .channel-browser input {
    display: block;
  }
}
</style>
