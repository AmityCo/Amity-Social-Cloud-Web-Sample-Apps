<template>
  <div class="centered-layout">
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
.centered-layout
  position relative
  display flex
  align-items center 
  justify-content center
  width 100vw
  height 100vh
</style>
