import { useState, useEffect } from "react";

import { ChannelRepository, ChannelType } from "@amityco/js-sdk";
import { client } from "./ascClient";

import NameInput from "./NameInput";

import Messages from "./Messages";
import MessageComposer from "./MessageComposer";

// channel for demo
const channelId = "simple-chat-demo";

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    client.once("connectionStatusChanged", async () => {
      await ChannelRepository.joinChannel({
        channelId,
        type: ChannelType.Community,
      });

      setConnected(true);
    });
  });

  return (
    <div className="app">
      {!connected && <NameInput />}
      {connected && (
        <div className="layout">
          <Messages channelId={channelId} />
          <MessageComposer channelId={channelId} />
        </div>
      )}
    </div>
  );
}

export default App;
