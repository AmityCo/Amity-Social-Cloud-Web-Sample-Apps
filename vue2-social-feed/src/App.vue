<template>
  <div id="app">
    <ThemeManager>
      <component v-if="layout" :is="layout">
        <router-view :key="$route.fullPath" />
      </component>
      <router-view v-else :key="$route.fullPath" />
    </ThemeManager>
  </div>
</template>

<script>
import ThemeManager from "@/components/ThemeManager";
export default {
  components: {
    ThemeManager,
  },
  computed: {
    user: ({ $store }) => $store.state.user,
    layout: ({ $route }) => $route.meta?.layout,
  },
};
</script>

<style lang="stylus">
* {
  box-sizing: border-box;
  touch-action: pan-x pan-y;
  outline: none;
}

html {
  font-size: 80%;
}

a, button {
  text-decoration: none;
  color: inherit;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  -webkit-touch-callout: none !important;
}

html, body, #app {
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
}

html, body, #app, input, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  border: none;
  background: none;
  font-size: 16px !important;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.primary-color {
  color: #0094F4 !important;
}
.tooltip[x-placement^="bottom"]{
  margin-left: 200px;
}
.tooltip-inner {
  position: relative;
  background: #f9f9f9;
  color: #000;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 3px 3px #00000021;
  margin-top: 6px;
}

.mention-item {
  padding: 5px 5px;
  font-size: 16px;
}

.mention-item.mention-selected {
  background-color: #38be8d4a;
  border-radius: 3px;
}
</style>
