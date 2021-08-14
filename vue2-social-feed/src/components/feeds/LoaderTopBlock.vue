<template>
    <div class="pulldown-top" />
</template>

<script>
export default {
  components: {
  },
  props:{
    state: String
  }
}
</script>

<style lang="stylus" scoped>

.pulldown-top
  width 50px
  height 50px
  margin 0 auto
  background-image url('~@/assets/spinner_slow.gif')
  background-position center center
  background-size cover
    
  &.active
    background-image url('~@/assets/spinner_fast.gif')

  text-align: center;
  img
    height: 100%;
    padding: 0rem;
  .white
    display none !important

.dark 
  .pulldown-top
    background-image url('~@/assets/spinner_dark_slow.gif')
    &.active
      background-image url('~@/assets/spinner_dark_fast.gif')

</style>
