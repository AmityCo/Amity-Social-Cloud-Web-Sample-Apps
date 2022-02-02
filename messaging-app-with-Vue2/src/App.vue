<template>
  <div id="app">
    <login-page v-if="!connected && !userId" @connect="onconnect" />
    <main-page v-else-if="connected && userId" />
    <loader v-else />
   </div>
</template>

<script>
import { connectClient } from "./ascClient";

import LoginPage from "@/views/Login";
import MainPage from "@/views/Main";
import Loader from '@/components/icons/Loader';

export default {
  components: {
    LoginPage,
    MainPage,
    Loader,
  },

  data: () => ({
    connected: false,
    userId: localStorage.getItem("userId"),
  }),

  mounted() {
    if (this.userId)
      this.onconnect({
        username: this.userId,
        persistent: true,
      })
  },

  methods: {
    async onconnect({ username, persistent }) {
      this.userId = username;
      await connectClient(username);
      this.connected = true;

      if (persistent) localStorage.setItem("userId", username);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  outline-color: var(--primary);
}

html,
body {
  --primary: #04BE8C;
  position: relative;
  display: block;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;

  font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande,
    sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.svg-icon {
  width: 1em;
  height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: currentColor;
}

.svg-icon circle {
  stroke: currentColor;
  stroke-width: 1;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
