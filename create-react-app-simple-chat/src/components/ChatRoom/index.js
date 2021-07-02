import React from "react";
import "./index.css";

import { ChannelHeader } from "../ChannelHeader";
import { MessageList } from "../MessageList";
import { MessageComposer } from "../MessageComposer";

export function ChatRoom({ channelId }) {
  return (
    <div className="ChatRoom">
      <ChannelHeader channelId={channelId} />
      <MessageList channelId={channelId} />
      <MessageComposer channelId={channelId} />
    </div>
  );
}
