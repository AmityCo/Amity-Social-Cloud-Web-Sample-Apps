<template>
  <div class="message-item" :class="{ self }">
    <div class="avatar">
      <image-component v-if="avatarFileId" :fileId="avatarFileId" />
    </div>

    <div class="displayname">{{ userName }}</div>

    <div class="content">
      <message-content :data="data" :type="type" :fileId="fileId" />
    </div>

    <div class="metadata">
      <reaction-picker :messageId="messageId" :myReactions="myReactions" /> • <em>{{ shortCreated }}</em>
      <sync-state :value="syncState" />
      <reactions-bar
        v-if="!!reactionsCount"
        :reactionsCount="reactionsCount"
        :reactions="reactions"
      />
    </div>
  </div>
</template>

<script>
import { short } from "tiny-human-time";

import { currentUserId } from '../../ascClient';

import ImageComponent from "@/components/Image";
import MessageContent from "./MessageContent";
import ReactionPicker from "@/components/reactions/ReactionPicker";
import SyncState from "./SyncState";
import ReactionsBar from "@/components/reactions/ReactionsBar";

export default {
  inheritAttrs: false,

  components: {
    ImageComponent,
    MessageContent,
    ReactionPicker,
    SyncState,
    ReactionsBar,
  },

  props: [
    "messageId",
    "userId",
    "type",
    "data",
    "fileId",
    "isDeleted",
    "createdAt",
    "syncState",
    "myReactions",
    "reactionsCount",
    "reactions",
    "user",
  ],

  computed: {
    self: ({ userId }) => userId === currentUserId,
    userName: ({ user }) => user?.model?.displayname ?? user?.model?.userId,
    avatarFileId: ({ user }) => user?.model?.avatarFileId,
    shortCreated: ({ createdAt }) => short(Date.now(), createdAt),
  }
};
</script>

<style>
.message-item {
  display: grid;
  grid-template-columns: 2rem max-content;
  grid-template-rows: 1rem 1rem 1fr min-content;
  grid-template-areas:
    "avatar displayname"
    "avatar message"
    ". message"
    ". metadata";

  grid-gap: 0 0.5rem;
  padding: 0 1rem 0.5rem;
}

.message-item .avatar {
  grid-area: avatar;
  overflow: hidden;
  width: 2rem;
  height: 2rem;
  background: #ebecef;
  border-radius: 2rem;
}

.message-item .displayname {
  grid-area: displayname;
  color: #636878;
}

.message-item .content {
  grid-area: message; 
}

.message-item .metadata {
  grid-area: metadata;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #636878;
  font-size: 0.7rem;
}

.message-item .metadata .reaction-bar {
  position: absolute;
  right: 0.5rem;
  top: -1rem;
}

/*****************/

.message-item.self {
  grid-template-columns: max-content;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    "displayname"
    "message"
    "metadata";
  justify-content: end;
}

.message-item.self .avatar,
.message-item.self .displayname {
  display: none;
}

.message-item.self .content {
  border-radius: 0.5rem 0 0.5rem 0.5rem;
  justify-self: end;
}

.message-item.self .metadata {
  justify-self: end;
}

</style>
