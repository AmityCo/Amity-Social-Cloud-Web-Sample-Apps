<template>
    <div class = "user-panel">
      <!-- <button class="border">Follow</button> -->
      <button class="border">Follow</button>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { UserRepository } from '@amityco/js-sdk'

export default {
  components: { Avatar },

  props: {
    id: String
  },

  computed: {
    ready: ({model}) => {
      return !!model;
    }
  },

  data: () => ({
    model: null
  }),

  created() {
    this.liveObject = new UserRepository().userForId(this.id)
    this.liveObject.on('dataUpdated', model => this.model = model)
    this.model = this.liveObject.model
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style lang="stylus" scoped>
.user-panel
  display grid
  grid-row 3
  grid-column 1 / 5
  grid-template-columns 50% 50%
  grid-template-rows auto
  margin-top 1rem
  gap 0.25rem
  button 
    background: none;
    border: 1px solid #CFCFCF;
    height: 2.5rem;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1rem;
    grid-column 1 / 3

.dark-mode .user-panel button 
      border: 1px solid #2F2F2F !important

  
</style>

