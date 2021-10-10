<template>
  <div :class="`${placeholder}-placeholder video`">
    <video v-if="model" :src="model.fileUrl" autoplay muted loop playsinline/>
  </div>
</template>

<script>
import { FileRepository } from "@amityco/js-sdk";

export default {
  props: {
    "id": String, 
    "placeholder":{
      type: String, default: 'photo'
      },
    size: {
      type: String,
      default: 'large',
    },
  },

  data: () => ({
    model: null,
  }),
  watch: {
    id: {
      handler(newVal) {
        if (this.liveObject) this.liveObject.dispose();
        if (!newVal) return;

        this.liveObject = FileRepository.fileInformationForId(newVal);
        this.liveObject.on("dataUpdated", (model) => (this.model = model));
        this.model = this.liveObject.model;
      },
      immediate: true,
    },
  },


  beforeDestroy() {
    this.liveObject?.dispose();
  },
};
</script>

<style lang="stylus" scoped>
.video {
  position: relative;
  background-size 100%

  video {
    width: 100%;
    height: 100%;
  }
}

.video {
  video {
    max-height: calc(100vh - 150px);
    background: black;
    object-fit: contain;
  }
}
.rounded
  border-radius 100%
  img
    border-radius 100%
.user-placeholder
  background-image url('~@/assets/user_placeholder.png')


</style>
