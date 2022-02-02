import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    ;(async () => {
      await ChannelRepository.joinChannel({
        channelId,
        type: ChannelType.Standard,
      });
  
      await ChannelRepository.startReading(channelId);
    })()
  }, [channelId]);

  const handleChange = async (value) => {
    try {
      await ChannelRepository.stopReading(channelId);
    } catch (err) {}

    setChannelId(value);
  };

  return (
    <div className={`Main ${overlay ? "overlay" : ""}`}>
      <button onClick={() => setOverlay(!overlay)}>
        {overlay ? "..." : "╳"}
      </button>

      <ChannelBrowser activeChannelId={channelId} onChange={handleChange} />
      <ChatRoom channelId={channelId} />
    </div>
  );
}
