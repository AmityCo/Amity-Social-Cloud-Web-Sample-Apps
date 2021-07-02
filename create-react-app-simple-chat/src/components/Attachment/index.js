import React from "react";
import "./index.css";

import { FileType } from "@amityco/js-sdk";

import { ImageContent } from "./ImageContent";
import { FileContent } from "./FileContent";

const MAPPING = {
  [FileType.Image]: ImageContent,
  [FileType.File]: FileContent,
};

export function Attachment({ file, onDelete = () => {} }) {
  if (!file) return null;

  const Content = MAPPING[file.type];

  if (!Content) return null;

  return (
    <div className="Attachment">
      <div className="Container">
        <Content fileId={file.fileId} />
        <button onClick={onDelete}>╳</button>
      </div>
    </div>
  );
}
