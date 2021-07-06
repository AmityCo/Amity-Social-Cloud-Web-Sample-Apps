import { MessageType } from "@amityco/js-sdk";

import MessageText from "./MessageText";
import MessageImage from "./MessageImage";
import MessageFile from "./MessageFile";

import SyncState from "./SyncState";

const MAPPING = {
  [MessageType.Text]: MessageText,
  [MessageType.Image]: MessageImage,
  [MessageType.File]: MessageFile,
};

const NotSupported = () => <em>message type not supported</em>;

function Message({ userId, type, data, fileId, syncState }) {
  const MessageContent = MAPPING[type] ?? NotSupported;

  return (
    <div className={`message ${type}`} title={`sync state: ${syncState}`}>
      <div className="title">
        <strong>{userId}</strong> <SyncState value={syncState} />
      </div>

      <div className="content">
        <MessageContent data={data} fileId={fileId} />
      </div>
    </div>
  );
}

export default Message;
