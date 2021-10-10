<template>
  <!-- <Picture v-if="!id" :class = "`avatar ${active?'active':''}`" placeholder = "user" :style="style"/> -->
  <Picture :class = "`rounded avatar ${active?'active':''}`" :id='id' placeholder="user" />
</template>

<script>
import Picture from '@/components/Picture'
import ThemeManager from '@/components/ThemeManager'
export default {
  components: { Picture, ThemeManager },
  props:{
    id: String,
    active: false
  },
  computed : {
    // style: ()=>{
    //   let theme = ThemeManager.getBorderColor();
    //   // if(theme == "000000" || theme == "FFFFFF") theme = '88888888';
    //   return `border-color: #${theme} !important`;
    //   }
  }
}
</script>

<style lang="stylus">
.avatar
  position relative
  width 2.5rem
  height 2.5rem
  border-radius 100%

  img
    border-radius  100%
    border: solid 2px
    border-color var(--schemeColor)

  &.large img
    border solid 4px

.avatar.active
  border 3px solid
  width 2.5rem
  height 2.5rem

.avatar.large
  width 6rem
  height 6rem
  border 2px solid #38be8d;

.avatar.inline
  display inline-block

</style>
