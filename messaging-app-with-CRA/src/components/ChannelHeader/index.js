import React, { useState, useEffect } from "react";
import "./index.css";

import { ChannelRepository } from "@amityco/js-sdk";

import { MemberIcon } from "../Icons";

export function ChannelHeader({ channelId }) {
  const [channel, setChannel] = useState();

  useEffect(() => {
    const liveObject = ChannelRepository.getChannel(channelId);

    liveObject.on("dataUpdated", setChannel);
    liveObject.model && setChannel(liveObject.model);

    return () => liveObject.dispose();
  }, [channelId]);

  return (
    <div className="ChannelHeader">
      <h3>{channel?.displayName ?? channel?.channelId}</h3>
      {channel?.memberCount > 0 && (
        <>
          {" • "}
          {channel?.memberCount} <MemberIcon />
        </>
      )}
    </div>
  );
}
