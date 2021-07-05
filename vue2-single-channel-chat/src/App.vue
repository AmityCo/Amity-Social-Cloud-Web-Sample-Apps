<template>
  <div id="app">
    <Login v-if="!isConnected" @submit="onsubmit" />
    <Home v-else />
  </div>
</template>

<script>
import { connectClient } from "./ascClient";

import Login from "@/views/Login";
import Home from "@/views/Home";

export default {
  name: "App",
  components: {
    Login,
    Home,
  },

  data: () => ({
    isConnected: false,
  }),

  methods: {
    onsubmit(userId) {
      connectClient(userId, () => (this.isConnected = true));
    },
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
