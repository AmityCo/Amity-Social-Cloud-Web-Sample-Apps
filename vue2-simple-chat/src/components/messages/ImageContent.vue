<template>
  <div class="image-content">
    <image-component :fileId="fileId" />

    <text-content v-if="caption">
      <em>{{ caption }}</em>
    </text-content>
  </div>
</template>

<script>
import ImageComponent from '@/components/Image'

import TextContent from './TextContent'

export default {
  components: { ImageComponent, TextContent },

  props: ['data', 'fileId'],

  computed: {
    caption: ({ data }) => data.caption,
  },
}
</script>

<style>
.image-content img {
  max-width: 15rem;
}
</style>
