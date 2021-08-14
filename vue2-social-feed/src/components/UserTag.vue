<template>
  <div class="user-tag" :class="{ active }" @click="onclick">
    <slot />
    <CrossIcon v-if="active" />
  </div>
</template>

<script>
import CrossIcon from '@/components/icons/CrossIcon'

export default {
  components: { CrossIcon },

  data: () => ({
    active: false,
  }),

  created() {

  },

  beforeDestroy() {
    if (this._doclistener) 
      document.removeEventListener('click', this._doclistener)
  },

  methods: {
    onclick() {
      !this.active ? this.focus() : this.$emit('click')
    },

    focus() {
      this.active = true

      if (!this._doclistener) {
        this._doclistener = e => {
          if (e.target !== this.$el || !e.target.contains(this.$el))
            this.blur()
        }
  
        document.addEventListener('click', this._doclistener)
      }
    },

    blur() {
      this.active = false

      if (this._doclistener) {
        document.removeEventListener('click', this._doclistener)
        this._doclistener = null
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.user-tag
  display flex 
  align-items center
  padding .5rem .75rem
  background #e0f1ff
  border-radius 2px
  color #0095f6

  &.active
    background #0095f6
    color #fff

  svg 
    width auto
    height .9rem
    margin-left .5rem
    fill currentColor
</style>
