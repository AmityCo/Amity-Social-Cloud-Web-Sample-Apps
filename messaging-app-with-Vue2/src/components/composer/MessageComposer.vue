<template>
  <div class="message-composer">
    <attachment v-if="file" :file="file" @delete="resetState" />

    <form ref="form" @submit.prevent="sendMessage">
      <div class="uploaders">
        <uploader accept="image/*" @input="val => file = val">
          <image-icon />
        </uploader>

        <uploader accept="*/*" @input="val => file = val">
          <file-icon />
        </uploader>
      </div>

      <input
        type="text"
        name="text"
        v-model="text"
        placeholder="Type something..."
        autoComplete="off"
        autoCorrect="off"
      />

      <button>
        <send-icon />
      </button>
    </form>
  </div>
</template>

<script>
import { MessageRepository } from "@amityco/js-sdk";

import ImageComponent from "@/components/Image";

import Attachment from "./Attachment";
import Uploader from "./Uploader";

import ImageIcon from "@/components/icons/ImageIcon";
import FileIcon from "@/components/icons/FileIcon";
import SendIcon from "@/components/icons/SendIcon";

export default {
  components: {
    Attachment,
    Uploader,
    ImageComponent,
    ImageIcon,
    FileIcon,
    SendIcon,
  },

  props: ["channelId"],

  data: () => ({
    text: "",
    file: null,
  }),

  methods: {
    resetState() {
      this.text = ''
      this.file = null
      this.$refs.form.reset()
    },

    sendMessage() {
      if (!this.file) {
        MessageRepository.createTextMessage({
          channelId: this.channelId,
          text: this.text,
        });
      } else if (this.file.type === "image") {
        MessageRepository.createImageMessage({
          channelId: this.channelId,
          imageId: this.file.fileId,
          caption: this.text,
        });
      } else if (this.file.type === "file") {
        MessageRepository.createFileMessage({
          channelId: this.channelId,
          fileId: this.file.fileId,
          caption: this.text,
        });
      }

      this.resetState();
    },
  },
};
</script>

<style>
.message-composer {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0.5rem 1rem 1rem;
  border-top: 1px solid #ccd0d5;
}

.message-composer form {
  display: grid;
  width: 100%;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 100%;
  grid-gap: 0.5rem;
}

.message-composer .uploaders {
  flex: 0 0 auto;
  display: flex;
}

.message-composer form input[type="text"] {
  flex: 1 1 auto;
  display: block;
  width: 100%;
  min-width: 0;
  padding: 0.6rem 1.2rem;
  border: 1px solid #ccd0d5;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.message-composer form button {
  flex: 0 0 auto;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
