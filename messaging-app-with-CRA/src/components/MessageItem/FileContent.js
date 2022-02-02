import { useEffect, useState } from "react";

import { FileRepository } from "@amityco/js-sdk";

import prettyBytes from "pretty-bytes";

import { AttachmentIcon } from "../Icons";

export function FileContent({ data: { caption } = {}, fileId }) {
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

  return (
    <a className="FileContent" href={model.fileUrl} download>
      <AttachmentIcon />
      <strong>{model.attributes.name}</strong>
      <span>{prettyBytes(model.attributes.size)}</span>
    </a>
  );
}
