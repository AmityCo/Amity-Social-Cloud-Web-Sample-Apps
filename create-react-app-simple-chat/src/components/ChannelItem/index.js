import React from "react";
import "./index.css";

import humanize from "tiny-human-time";
import { Image } from "../Image";

export function ChannelItem({
  channelId,
  displayName,
  avatarFileId,
  lastActivity,
  unreadCount,
  active,
  onClick = () => {},
}) {
  return (
    <div
      className={`ChannelItem ${active ? "active" : ""}`}
      onClick={() => onClick(channelId)}
    >
      <div className="Avatar">
        {avatarFileId && <Image fileId={avatarFileId} />}
      </div>
      <div className="DisplayName">{displayName ?? channelId}</div>
      <div className="LastActivity">{humanize(Date.now(), lastActivity)}</div>
      {!!unreadCount && <div className="UnreadCount">{unreadCount}</div>}
    </div>
  );
}
