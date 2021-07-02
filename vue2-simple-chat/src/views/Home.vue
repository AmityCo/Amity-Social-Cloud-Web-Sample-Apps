<template>
  <div id="home">
    <button @click="visible = !visible">toggle</button>
    <chat-room v-if="visible" channelId="simple-chat-demo" />
  </div>
</template>

<script>
import ChatRoom from "@/components/ChatRoom";

export default {
  components: { ChatRoom },

  data: () => ({
    visible: true,
  }),
};
</script>

<style lang="scss">
#home > button {
  z-index: 100;
  position: fixed;
  display: block;
  top: -1.5rem;
  width: 100%;
  padding: 0.5rem;
  background: rgba(0, 209, 178, 0.6);
  border: none;
  border-bottom: 1px solid rgba(0, 209, 178, 1);
  box-shadow: 0 1px 0.25rem rgba(0, 0, 0, 0.6);
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  transition: top 0.2s;
}

#home > button:hover {
  top: 0;
}
</style>