import React from "react";
import "./index.css";

import { MessageType } from "@amityco/js-sdk";
import { short } from "tiny-human-time";

import { currentUserId } from "../../ascClient";

import { Image } from "../Image";

import { Deleted } from "./Deleted";
import { NotSupported } from "./NotSupported";

import { TextContent } from "./TextContent";
import { ImageContent } from "./ImageContent";
import { FileContent } from "./FileContent";

import { ReactionBar } from "../ReactionBar";
import { ReactionPicker } from "../ReactionPicker";
import { SyncState } from "./SyncState";

const MAPPING = {
  [MessageType.Text]: TextContent,
  [MessageType.Image]: ImageContent,
  [MessageType.File]: FileContent,
};

export function MessageItem({
  messageId,
  userId,
  type,
  data,
  fileId,
  isDeleted,
  createdAt,
  syncState,
  myReactions,
  reactionsCount,
  reactions,
  user: liveUser,
}) {
  const MessageContent = isDeleted ? Deleted : MAPPING[type] ?? NotSupported;

  const user = liveUser.model;

  return (
    <div
      className={`MessageItem ${type} ${
        userId === currentUserId ? "self" : ""
      }`}
    >
      <div className="Avatar">
        {user?.avatarFileId && <Image fileId={user.avatarFileId} />}
      </div>

      <div className="DisplayName">
        {user?.displayName ?? user?.userId ?? userId}
      </div>

      <div className="Content">
        <MessageContent data={data} fileId={fileId} />
      </div>

      <div className="Metadata">
        <ReactionPicker messageId={messageId} myReactions={myReactions} />
        {" • "}
        <em>{short(Date.now(), createdAt)}</em>
        <SyncState value={syncState} />

        {!!reactionsCount && (
          <ReactionBar reactionsCount={reactionsCount} reactions={reactions} />
        )}
      </div>
    </div>
  );
}
