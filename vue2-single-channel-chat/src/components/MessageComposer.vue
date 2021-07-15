<template>
  <div class="message-composer">
    <div class="composer-bar">
      <image-file />

      <div class="input">
        <input
          type="text"
          placeholder="Say Something..."
          v-model="text"
          @keyup.prevent.enter="send"
        />
      </div>

      <div class="buttons">
        <label class="button">
          <input ref="file" type="file" @input="attach" />
          <b-icon class="fontstyle" icon="paperclip" />
        </label>
        <b-button>
          <b-icon class="fontstyle" icon="paper-plane" @click="send" />
        </b-button>
      </div>
    </div>

    <div v-if="file" class="preview">
      <attachment :fileId="file.fileId" :type="file.type" @remove="reset" />
    </div>
  </div>
</template>

<script>
import { MessageRepository, FileRepository } from "@amityco/js-sdk";

import ImageFile from "@/components/ImageFile";
import Attachment from "@/components/Attachment";

export default {
  components: { ImageFile, Attachment },

  props: ["channelId"],

  data: () => ({
    text: "",
    file: null,
  }),

  beforeDestroy() {
    this.liveMessage?.dispose();
    this.liveFile?.dispose();
  },

  methods: {
    reset() {
      this.text = "";
      this.file = null;

      // https://stackoverflow.com/a/66105137/335243
      this.$refs.file.files = new DataTransfer().files;
    },

    send() {
      this.liveMessage?.dispose();

      if (!this.file) {
        this.liveMessage = MessageRepository.createTextMessage({
          channelId: this.channelId,
          text: this.text,
        });
      } else if (this.file.type === "image") {
        this.liveMessage = MessageRepository.createImageMessage({
          channelId: this.channelId,
          imageId: this.file.fileId,
          caption: this.text,
        });
      } else if (this.file.type === "file") {
        this.liveMessage = MessageRepository.createFileMessage({
          channelId: this.channelId,
          fileId: this.file.fileId,
          caption: this.text,
        });
      }

      this.liveMessage?.on('dataError', err => {
        console.log(err)
      })

      this.reset();
    },

    attach(e) {
      this.liveFile?.dispose();

      this.liveFile = FileRepository.createFile({
        file: e.target.files[0],
      });

      this.liveFile.on("dataUpdated", (model) => (this.file = model));
      this.file = this.liveFile.model;
    },
  },
};
</script>

<style lang="scss">
.message-composer {
  position: relative;
  padding: 0 0.5rem 0.5rem;
}

.composer-bar {
  display: grid;
  grid-template-areas: "avatar input buttons";
  grid-template-columns: min-content auto max-content;
  grid-template-rows: 100%;
  align-items: center;
  grid-gap: 0.5rem;
}

.composer-bar > .image-file {
  grid-area: avatar;
  position: relative;
  width: 2rem;
  height: 2rem;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E%0A");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.message-composer .input {
  grid-area: input;
  display: flex;
}

.message-composer .input input {
  flex: 1 1 100%;
  border: none;
  font: inherit;
  color: inherit;
  outline: none;
}

.message-composer .buttons {
  grid-area: buttons;
  display: flex;
}

.message-composer .buttons .button {
  padding: 0 1rem;
  background: none;
  cursor: pointer;
}

.message-composer .buttons .button input[type="file"] {
  position: absolute;
  visibility: hidden;
}

.message-composer .buttons .button input[type="file"] + * {
  margin: 0 calc(-0.5em - 1px);
}

.message-composer .preview {
  z-index: 100;
  position: absolute;
  bottom: 100%;
  right: calc(0.5rem + 1px);
  max-width: 25%;
  max-height: 10rem;
  padding: 0.5rem;
  border: 1px solid #dbdbdb;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.message-composer .preview:hover {
  max-width: 40%;
  max-height: 20rem;
}
</style>
