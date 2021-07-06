import { FileType } from "@amityco/js-sdk";

import MessageImage from "./MessageImage";
import MessageFile from "./MessageFile";

const MAPPING = {
  [FileType.Image]: MessageImage,
  [FileType.File]: MessageFile,
};

export default function Preview({ file, onDelete = () => {} }) {
  if (!file) return null;

  const Content = MAPPING[file.type];

  if (!Content) return null;

  return (
    <div className="preview">
      <Content fileId={file.fileId} />
      <button onClick={onDelete}>╳</button>
    </div>
  );
}
