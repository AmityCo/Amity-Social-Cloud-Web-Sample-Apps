import { useState, useEffect } from "react";

import { ChannelRepository, ChannelType } from "@amityco/js-sdk";
import { client } from "./ascClient";

import NameInput from "./NameInput";

import Messages from "./Messages";
import MessageInput from "./MessageInput";

// channel for demo
const channelId = "simple-chat-demo";

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    client.once("connectionStatusChanged", () => {
      new ChannelRepository()
        .joinChannel({
          channelId,
          type: ChannelType.Standard,
        })
        .once("dataUpdated", () => setConnected(true));
    });
  });

  return (
    <div className="app">
      {!connected && <NameInput />}
      {connected && (
        <div className="layout">
          <Messages channelId={channelId} />
          <MessageInput channelId={channelId} />
        </div>
      )}
    </div>
  );
}

export default App;
