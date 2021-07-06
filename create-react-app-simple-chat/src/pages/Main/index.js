import React, { useState } from "react";
import "./index.css";

import {
  ChannelRepository,
  ChannelMembershipRepository,
  ChannelType,
  ChannelMembership,
} from "@amityco/js-sdk";

import { ChannelBrowser } from "../../components/ChannelBrowser";
import { ChatRoom } from "../../components/ChatRoom";

// channel for demo
const DEFAULT_CHANNEL_ID = "simple-chat-demo";

export function Main() {
  const [channelId, setChannelId] = useState(DEFAULT_CHANNEL_ID);
  const [overlay, setOverlay] = useState(true);

  const onChange = async (value) => {
    try {
      await ChannelRepository.stopReading(channelId);
    } catch (err) {}

    const channelUser = new ChannelMembershipRepository(value);
    const channelMembership = channelUser.myMembership;

    await new Promise((resolve) => {
      const callback = async (model) => {
        channelMembership.dispose();
        resolve();
      };

      channelMembership?.on("dataUpdated", callback);
      channelMembership?.model && callback(channelMembership.model);
    });

    const { membership } = channelMembership?.model ?? {};

    if (membership === ChannelMembership.Banned) {
      setChannelId(DEFAULT_CHANNEL_ID);
      return;
    } else if (membership !== ChannelMembership.Member) {
      await ChannelRepository.joinChannel({
        channelId: value,
        type: ChannelType.Community,
      });
    }

    await ChannelRepository.startReading(value);
    setChannelId(value);
  };

  return (
    <div className={`Main ${overlay ? "overlay" : ""}`}>
      <button onClick={() => setOverlay(!overlay)}>
        {overlay ? "..." : "╳"}
      </button>

      <ChannelBrowser activeChannelId={channelId} onChange={onChange} />
      <ChatRoom channelId={channelId} />
    </div>
  );
}
