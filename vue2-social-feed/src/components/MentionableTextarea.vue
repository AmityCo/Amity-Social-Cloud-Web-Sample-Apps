<template>
  <Mentionable :keys="['@']" :items="items" placement="auto"
    @search="loadIssues($event)"
  >
    <textarea
      type="text"
      v-model="text"
      @change="val => $emit('input', text)"
      @keydown.enter.exact.prevent
      @keyup.enter.exact="submit"
      @keydown.enter.shift.exact="newline"
      :placeholder="placeholder"
    ></textarea>
    <template #no-result>
      {{ loading ? 'Loading...' : text.length > 0 ? '':'User not found' }}
    </template>
  </Mentionable>
</template>

<script>
import { Mentionable } from "vue-mention";
import {asynchronize} from "../utils/LiveObjectHelper";
import { UserRepository } from "@amityco/js-sdk";

export default {
  components: {
    Mentionable,
  },
  props:["placeholder"],
  computed: {
  },
  data () {
    return {
      text: '',
      items: [],
      loading: false,
    }
  },
  methods:{
    async loadIssues (searchText = null) {
      // console.log("SEARCHING ", searchText);
      this.loading = true
      this.items = (await asynchronize(new UserRepository().searchUserByDisplayName(searchText))).map(model=>{return {value: model.userId, label: model.userId}});

      this.loading = false
    },
    submit(){
      this.$emit('submit')
    }
  }
};
</script>
<style scoped>
  textarea{
    width: 100%;
  }
</style>
