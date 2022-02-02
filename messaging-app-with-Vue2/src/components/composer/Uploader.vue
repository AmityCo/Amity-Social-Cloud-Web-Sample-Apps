<template>
  <label class="uploader">
      <slot />
      <input type="file" v-bind="$attrs" @input="oninput" />
    </label>
</template>

<script>
import { FileRepository } from "@amityco/js-sdk";

export default {
  methods: {
    oninput(e) {
      this.liveObject?.dispose()

      this.liveObject = FileRepository.createFile({
        file: e.target.files[0],
      });

      if (this.liveObject.model)
        this.$emit('input', this.liveObject.model);

      this.liveObject.on("dataUpdated", model => {
        this.$emit('input', model)
      });
    }
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>

<style>
.uploader {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.uploader:hover {
  background: #f4f4f4;
}

.uploader input {
  position: absolute;
  top: 100%;
  right: 100%;
}
</style>
