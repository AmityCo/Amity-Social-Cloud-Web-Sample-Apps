import { useEffect, useState } from "react";

import { FileRepository } from "@amityco/js-sdk";

import prettyBytes from "pretty-bytes";

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
    <span className="FileContent">
      <strong>{model.attributes.name}</strong>
      {prettyBytes(model.attributes.size)}
    </span>
  );
}
