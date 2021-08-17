<template>
  <div class="last-message">
    <Avatar :fileId="user.fileId" />
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'

export default {
  components: { Avatar },
}
</script>

<style lang="stylus" scoped>
.last-message
  position relative
</style>
