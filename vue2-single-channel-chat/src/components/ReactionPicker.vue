<template>
  <div class="reaction-picker">
    <button
      class="picker-button"
      @click="toggle = !toggle"
    />

    <div v-if="toggle" class="dropdown-menu" >
      <div class="dropdown-content">
        <picker
          class="picker"
          :data="emojis"
          @select="(emoji) => $emit('pick', emoji.colons)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";

import { Picker, EmojiIndex } from "emoji-mart-vue-fast";

export default {
  components: { Picker },

  computed: {
    emojis: () => new EmojiIndex(data),
  },

  data: () => ({
    toggle: false,
  }),

  mounted() {
    this.listener = e => {
      if (!this.toggle) return
      
      if (!this.$el.contains(e.target))
        this.toggle = false;
    }

    document.addEventListener('click', this.listener)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.listener)
  },
};
</script>

<style lang="scss">
.reaction-picker {
  position: relative;
  display: inline-block;
}

.picker-button {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAES0lEQVRoBe1Y6ys2URD3p7o/hFAeyS354oPcopR8cEsoueQDkkuEIokUpcj9Lpfcmbff1kxn91m7s+v1Su8ztZ0958z85rezZ2fO2QT6pZLwS3lTnPi/fnPxiP+XEZ+amqKenh56eHhQP/+PL5WLiwtKSkqixMREmpyc/D3Ed3Z2LNIgPjAw8LPEn56e6O7ujl5fX32J/Bjx5+dnWllZodbWVioqKqKMjAyJIJZAaWkpHR4e2h4AywOEcc3Pz4t+W1ubjB8cHNDHx4fNzuyEXuMgPDw8TJmZmeIYr9vtGhwcFJ/4EHlNu+maY/X19WLnvAlFfG1tjfLy8mJI5ufnU1VVFTU3N1NLSwvV1NRQY2MjIcIsyB4mOa/74uJiNotpAxMfHR21RSw1NZX6+vpod3c3Btxt4PHx0coe+BBxYXkweTw0j4+MjNDp6akbhDUWiDheOTtBW15eTnt7e5+Caya+/eNcWlqSSCcnJ1uReXt703Dz1PlW4ldXV5Seni7RDlIoPFkTEbIHv0UsD62olgpSHYNXV1drsVV6SHkNDQ1WKj07O1PZQMmXOHIwpy+kvsvLSwE/OjqyskgkErFa9J2i0XHaaPq+xPv7+yXa09PTgolIoeDwm0CLvlk0NDoCGPDGl3hJSYlFDlF9eXkReKQqkzTfmylMo8OAJycn1jaB+36tJ/Hr62sh19TUZMPCfgQ5nAmjRR/jLBod6G5sbFg4WVlZdH9/z+aerSfx7e1tIYby7pTx8XFZ//gO0HeKRmdsbEz8bG5uOiFc+57El5eXBXB2dtYVAB/v4uJizEbKVPbTWVhYED+oFxrxJD43NxcYUOPUqQOyvOTgUyOexNfX1wVwYmJCgxdKB9hMHD414kl8f39fALGRcgo2SNglBrlg4xRgM3H41IgncWSFtLQ0C7SiosKGh60qOwvamttcgAIbGPCFfb5GPIkDoK6uTgiaVRPFRXOIcD4UbMwiBUzWgS+t+BJHtWRgHBBM6ezslDnW8Wu7urpMCOvQwTYzMzO2Oa+OL3Esl9zcXCFopivMRaNRmWMCn7UFBQW2AmVmE/gAnlZ8iQMI50Qmk5OTQ7e3t4J/fHwsa5R13FqsY+iy3NzcELBYFz6CiIr4+/s7VVZWipPa2lpbdDCPylpWVkYpKSmih3uckoaGhgg6LIgsMJg0sM151vNqVcQBgH0LDsPsrLCwkLa2tmKw8S+Ffz24/VeBDWwZB6kU2EFFTRzAIJSdnS1OsT/p7u5WpTCkOejy3h7EgaU9ZDsfLBBxGJ+fn1s/eThiaPFhtbe30+rqqrWOcZLHhTWNMcyZHzhs8KMIWGElMHE4whrt7e2V4mQ+hN89igxsg2QQt4cLRZyBUDw6OjpioulGHhGHrlnEGCdM+yXi7BCVEHt3/CzCnyoUKly4xxjmzGrJdl9p/wrxrxAIaxsnHjZyYe3iEQ8bubB28YiHjVxYuz91mksB/a9Q2QAAAABJRU5ErkJggg==");
  background-size: contain;
  background-position: center;
  cursor: pointer;
}

.reaction-picker .dropdown-menu {
  z-index: 10;
  position: absolute;
  display: block;
  top: auto !important;
  bottom: 0;
  min-width: 1rem !important;
  text-align: center;
}

.reaction-picker .dropdown-content {
  padding: 0 !important;
}

.reaction-picker .emoji-mart-bar-preview {
  display: none !important;
}
</style>
