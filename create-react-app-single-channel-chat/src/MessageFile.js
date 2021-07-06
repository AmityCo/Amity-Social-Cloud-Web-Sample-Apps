import { useEffect, useState } from "react";

import { FileRepository } from "@amityco/js-sdk";

import prettyBytes from "pretty-bytes";
import { download } from "./utils";

function MessageFile({ data: { caption } = {}, fileId }) {
  const [model, setModel] = useState();

  useEffect(() => {
    const file = FileRepository.getFile(fileId);

    if (file.model) {
      setModel(file.model);
    } else {
      file.once("dataUpdated", setModel);
    }
  }, [fileId]);

  if (!model) return null;

  const downloadFile = () => {
    if (!model || !model.fileUrl || model.fileUrl.startsWith("blob:")) return;

    download(model.fileUrl, model.attributes.name);
  };

  return (
    <div className="file" onClick={downloadFile}>
      <strong>{model.attributes.name}</strong>
      {prettyBytes(model.attributes.size)}
    </div>
  );
}

export default MessageFile;
