import React, { useState, useRef } from "react";
import "./index.css";

import { ChannelList } from "../ChannelList";

export function ChannelBrowser({
  userId,
  activeChannelId,
  onChange = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState();

  const timer = useRef();

  const handleSearchQuery = (e) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 200);
  };

  return (
    <div className="ChannelBrowser">
      <div className="Header">
        <h2>Chats</h2>
        <input
          type="search"
          name="search"
          placeholder="Search a channel..."
          onChange={handleSearchQuery}
        />
      </div>

      <ChannelList
        activeChannelId={activeChannelId}
        searchQuery={searchQuery}
        onClick={onChange}
      />
    </div>
  );
}
