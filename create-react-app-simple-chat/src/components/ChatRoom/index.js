import React, { useState, useEffect } from "react";
import "./index.css";

import { ChannelHeader } from "../ChannelHeader";
import { MessageList } from "../MessageList";
import { MessageComposer } from "../MessageComposer";

const hiddenProp = ["hidden", "msHidden", "webkitHidden"].find(
  (prop) => prop in document
);

const visibilityEvent = {
  hidden: "visibilitychange",
  msHidden: "msvisibilitychange",
  webkitHidden: "webkitvisibilitychange",
}[hiddenProp];

export function ChatRoom({ channelId }) {
  const [key, setKey] = useState(Date.now());

  const refreshKey = () => {
    navigator.onLine && // internet is back
      !document[hiddenProp] && // page is not hidden
      setKey(Date.now());
  };

  useEffect(() => {
    window.addEventListener("online", refreshKey);
    document.addEventListener(visibilityEvent, refreshKey);

    return () => {
      window.addEventListener("online", refreshKey);
      document.removeEventListener(visibilityEvent, refreshKey);
    };
  });

  return (
    <div key={key} className="ChatRoom">
      <ChannelHeader channelId={channelId} />
      <MessageList channelId={channelId} />
      <MessageComposer channelId={channelId} />
    </div>
  );
}
