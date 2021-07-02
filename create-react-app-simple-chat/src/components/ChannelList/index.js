import React, { useRef, useState, useEffect } from "react";
import "./index.css";

import { ChannelRepository, ChannelFilter } from "@amityco/js-sdk";

import { ChannelItem } from "../ChannelItem";

export function ChannelList({
  activeChannelId,
  searchQuery,
  onClick = () => {},
}) {
  const [channels, setChannels] = useState([]);
  const [top, setTop] = useState(true);

  const collection = useRef();

  useEffect(() => {
    collection.current = ChannelRepository.queryChannels({
      keyword: searchQuery?.length ? searchQuery : undefined,
      filter: searchQuery ? ChannelFilter.All : ChannelFilter.Member,
    });

    collection.current.on("dataUpdated", setChannels);

    return () => collection.current.dispose();
  }, [searchQuery]);

  const onScroll = (e) => {
    setTop(e.target.scrollTop === 0);

    if (!collection.current.hasMore) return;

    const visibleHeight = e.target.scrollHeight - e.target.clientHeight;

    if (e.target.scrollTop >= visibleHeight - 1) {
      collection.current?.nextPage();
    }
  };

  return (
    <div className={`ChannelList ${top ? "top" : ""}`} onScroll={onScroll}>
      {channels.map((channel) => (
        <ChannelItem
          key={channel.channelId}
          {...channel}
          active={channel.channelId === activeChannelId}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
