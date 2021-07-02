<template>
  <div class="user-header">
    <image-file :fileId="user.avatarFileId" />
    <strong>{{ displayName }}</strong>
  </div>
</template>

<script>
import { UserRepository } from "@amityco/js-sdk";

import ImageFile from "@/components/ImageFile";

export default {
  components: { ImageFile },

  props: ["userId"],

  computed: {
    displayName: ({ user }) =>
      user.displayName ?? user.userId ?? "Unknown user",
  },

  data: () => ({
    user: {},
  }),

  beforeMount() {
    this.liveObject = UserRepository.getUser(this.userId);

    this.liveObject.on("dataUpdated", (model) => (this.user = model));
    this.user = this.liveObject.model ?? {};
  },

  beforeDestroy() {
    this.liveObject?.dispose();
  },
};
</script>

<style lang="scss">
.user-header {
  display: inline-flex;
  align-items: baseline;
}

.user-header > * {
  margin-right: 0.25rem;
}

.user-header .image-file {
  position: relative;
  top: 0.45rem;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E%0A");
}
</style>