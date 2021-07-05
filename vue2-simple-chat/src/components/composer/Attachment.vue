<template>
  <div class="attachment">
    <div class="container">
      <image-content v-if="file.type === 'image'" :fileId="file.fileId" />
      <file-content v-if="file.type === 'file'" :fileId="file.fileId" />
      <button @click="() => $emit('delete')">╳</button>
    </div>
  </div> 
</template>

<script>
import ImageContent from './ImageContent'
import FileContent from './FileContent'

export default {
  components: {
    ImageContent,
    FileContent,
  },  

  props: ['file'],
}
</script>

<style>
.attachment {
  max-height: 4rem;
  padding-bottom: 0.5rem;
}

.attachment .container {
  position: relative;
  display: inline-block;
  height: 100%;
}

.attachment .image-content {
  height: 100%;
}

.attachment .file-content {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid #ccd0d5;
  border-radius: 0.25rem;
  font-size: 0.8rem;
}

.attachment button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 4rem;
  cursor: pointer;
  color: #fff;
}

.attachment button:hover {
  background: rgba(0, 0, 0, 0.6);
}

</style>
