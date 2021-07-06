<template>
  <div class="channel-item" :class="{ active }">
    <div class="avatar">
      <image-component v-if="avatarFileId" :fileId="avatarFileId" />
    </div>
    <div class="displayname">{{ channelName }}</div>
    <div class="metadata">{{ channelActivity }} • {{ memberCount }} <member-icon /></div>
    <div v-if="unreadCount" class="unreadcount">{{ unreadCount}}</div>
  </div>
</template>

<script>
import humanize from "tiny-human-time";

import ImageComponent from '@/components/Image';

import MemberIcon from '@/components/icons/MemberIcon';

export default {
  inheritAttrs: false,

  components: { ImageComponent, MemberIcon },

  props: [
    'channelId',
    'displayName',
    'avatarFileId',
    'lastActivity',
    'memberCount',
    'unreadCount',
    'active',
  ],

  computed: {
    channelName: ({ displayName, channelId }) => displayName ?? channelId,
    channelActivity: ({ lastActivity }) => humanize(Date.now(), lastActivity),
  }
}
</script>

<style>
.channel-item {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "avatar displayname unreadcount"
    "avatar metadata unreadcount";

  grid-gap: 0 0.5rem;
  align-items: center;
  padding: 0.75rem 0.5rem;

  background: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
}

.channel-item.active {
  background: #f5f5f5;
}

.channel-item:hover {
  background: #f2f2f2;
}

.channel-item .avatar {
  grid-area: avatar;
  overflow: hidden;
  width: 3rem;
  height: 3rem;
  margin-right: 0.25rem;
  background: #ebecef;
  border-radius: 3rem;
}

.channel-item .displayname {
  overflow: hidden;
  grid-area: displayname;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.channel-item .metadata {
  overflow: hidden;
  grid-area: metadata;
  font-size: 0.8rem;
  color: #888;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.channel-item .unreadcount {
  grid-area: unreadcount;
  align-self: center;
  padding: 0.125rem 0.325rem;
  background: #e00;
  border-radius: 5rem;
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
}

@media (min-width: 480px) {
  .channel-item .displayname,
  .channel-item .metadata,
  .channel-item .unreadcount {
    display: none;
  }
}

@media (min-width: 720px) {
  .channel-item .displayname,
  .channel-item .unreadcount {
    display: block;
  }
  
  .channel-item .metadata {
    display: flex;
  }
}

</style>
