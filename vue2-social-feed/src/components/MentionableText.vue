<template>
  <span class="mentionable-text" v-html="processedHtml" />
</template>

<script>
import { asynchronize } from "../utils/LiveObjectHelper";
import { UserRepository } from "@amityco/js-sdk";

export default {
  props: ["text"],
  computed: {
    processedHtml(){
      let regexp = /(\s|^)(@[^\s]+)/g;
      let mentioned = null;
      let html = this.text;
      while ((mentioned = regexp.exec(this.text))) {
        html = html.replace(mentioned[2], `<a class="user inline" href="#/users/${mentioned[2].substring(1)}"><strong>${mentioned[2]}</strong></a>`);
      }
      return html;
    },
  },
  methods: {
  },
};
</script>
<style scoped>
</style>
