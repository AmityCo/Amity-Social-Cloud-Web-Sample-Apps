<template>
  <image-component class="image-content" :fileId="fileId" />
</template>

<script>
import ImageComponent from '@/components/Image'

export default {
  components: { ImageComponent },

  props: ['fileId']
}
</script>

<style>
.image.image-content {
  width: initial;
  height: 100%;
}

.image.image-content img {
  width: auto !important;
}
</style>
