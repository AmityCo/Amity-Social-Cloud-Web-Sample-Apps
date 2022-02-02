import { useState } from "react";
import "./index.css";

import { MessageRepository, FileType } from "@amityco/js-sdk";

import { Uploader } from "../Uploader";
import { Attachment } from "../Attachment";

import { ImageIcon, FileIcon, SendIcon } from "../Icons";

const createUniqueKey = () => `${Math.random().toString(16)}.${Date.now()}`;

export function MessageComposer({ channelId }) {
  const [uniqueKey, setUniqueKey] = useState(createUniqueKey());
  const [file, setFile] = useState();

  const resetState = () => {
    setFile();
    setUniqueKey(createUniqueKey());
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const { text } = Object.fromEntries(new FormData(e.target));

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

    e.target.reset();
    resetState();
  };

  return (
    <div className="MessageComposer">
      {file && <Attachment file={file} onDelete={resetState} />}

      <form onSubmit={sendMessage}>
        <div className="Uploaders">
          <Uploader key={`${uniqueKey}#1`} accept="image/*" onChange={setFile}>
            <ImageIcon />
          </Uploader>

          <Uploader key={`${uniqueKey}#2`} accept="*/*" onChange={setFile}>
            <FileIcon />
          </Uploader>
        </div>

        <input
          type="text"
          name="text"
          placeholder="Type something..."
          autoComplete="off"
          autoCorrect="off"
        />
        <button>
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
