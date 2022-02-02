<template>
  <deleted v-if="isDeleted" />
  <text-content v-else-if="type === 'text'" :data="data" />
  <image-content v-else-if="type === 'image'" :data="data" :fileId="fileId" />
  <file-content v-else-if="type === 'file'" :fileId="fileId" />
  <not-supported v-else />
</template>

<script>
import Deleted from './Deleted'
import NotSupported from './NotSupported'

import TextContent from './TextContent'
import ImageContent from './ImageContent'
import FileContent from './FileContent'

export default {
  components: {
    Deleted,
    NotSupported,
    TextContent,
    ImageContent,
    FileContent,
  },

  props: ['data', 'type', 'fileId', 'isDeleted'],
}
</script>

<style>
.content {
  overflow: hidden;
  margin: 0.5rem 0 0.25rem;
  background: #ebecef;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  color: #000;
}

.message-item.self .content {
  background: var(--primary);
  border-radius: 0.5rem 0 0.5rem 0.5rem;
  color: #fff;
}
</style>
