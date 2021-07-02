import React, { useRef, useState, useEffect } from "react";
import "./index.css";

import { MessageRepository } from "@amityco/js-sdk";

import { MessageItem } from "../MessageItem";

export function MessageList({ channelId }) {
  const [messages, setMessages] = useState([]);

  const collection = useRef();

  useEffect(() => {
    collection.current = MessageRepository.queryMessages({
      channelId,
    });

    collection.current.on("dataUpdated", setMessages);
    collection.current.models && setMessages(collection.current.models);

    return () => collection.current.dispose();
  }, [channelId]);

  const onScroll = (e) => {
    if (!collection.current.hasMore) return;

    const el = e.target;

    const top = el.scrollHeight - el.clientHeight;
    const scroll = -el.scrollTop; // reversed because of the flex direction

    if (top - scroll <= 1) {
      collection.current.nextPage();
    }
  };

  return (
    <div className="MessageList" onScroll={onScroll}>
      {messages.map((message) => (
        <MessageItem key={message.messageId} {...message} />
      ))}
    </div>
  );
}
