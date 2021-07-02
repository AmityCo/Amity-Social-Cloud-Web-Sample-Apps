import React, { useState, useEffect } from "react";
import "./index.css";

import { FileRepository } from "@amityco/js-sdk";

export function Image({ fileId }) {
  const [file, setFile] = useState();

  useEffect(() => {
    const liveObject = FileRepository.getFile(fileId);

    liveObject.on("dataUpdated", setFile);
    liveObject.model && setFile(liveObject.model);

    return () => liveObject.dispose();
  }, [fileId]);

  return (
    <div className="Image">{file && <img src={file.fileUrl} alt="" />}</div>
  );
}
