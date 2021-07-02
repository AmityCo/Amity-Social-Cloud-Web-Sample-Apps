import { useState } from "react";

import { MessageRepository, FileType } from "@amityco/js-sdk";

import Input from "./Input";
import Preview from "./Preview";

import Uploader from "./Uploader";
import { ImageIcon, CameraIcon, FileIcon } from "./Icons";

const createUniqueKey = () => `${Math.random().toString(16)}.${Date.now()}`;

function MessageComposer({ channelId }) {
  const [uniqueKey, setUniqueKey] = useState(createUniqueKey());
  const [file, setFile] = useState();

  const resetState = () => {
    setFile();
    setUniqueKey(createUniqueKey());
  };

  const sendMessage = (text) => {
    if (!file) {
      MessageRepository.createTextMessage({
        channelId,
        text,
      });
    } else if (file.type === FileType.Image) {
      MessageRepository.createImageMessage({
        channelId,
        imageId: file.fileId,
        caption: text,
      });
    } else if (file.type === FileType.File) {
      MessageRepository.createFileMessage({
        channelId,
        fileId: file.fileId,
        caption: text,
      });
    }

    resetState();
  };

  return (
    <div className="composer">
      {file && <Preview file={file} onDelete={resetState} />}

      <Input placeholder="Type something..." onInput={sendMessage} />

      <div className="buttons">
        <Uploader key={`${uniqueKey}#1`} accept="image/*" onChange={setFile}>
          <ImageIcon />
        </Uploader>
        <Uploader
          key={`${uniqueKey}#2`}
          accept="image/*"
          capture="camera"
          onChange={setFile}
        >
          <CameraIcon />
        </Uploader>
        <Uploader key={`${uniqueKey}#3`} accept="*/*" onChange={setFile}>
          <FileIcon />
        </Uploader>
      </div>
    </div>
  );
}

export default MessageComposer;
