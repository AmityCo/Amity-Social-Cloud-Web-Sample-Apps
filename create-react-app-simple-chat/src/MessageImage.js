import { useEffect, useState } from "react";

import { FileRepository } from "@amityco/js-sdk";

function MessageImage({ data: { caption } = {}, fileId }) {
  const [fileUrl, setFileUrl] = useState();

  useEffect(() => {
    const file = FileRepository.getFile(fileId);

    if (file.model) {
      setFileUrl(file.model.fileUrl);
    } else {
      file.once("dataUpdated", (model) => {
        setFileUrl(model.fileUrl);
      });
    }
  }, [fileId]);

  if (!fileUrl) return null;

  const sizedUrl = fileUrl.startsWith("blob:")
    ? fileUrl
    : `${fileUrl}?size=medium`;

  return (
    <div>
      <img src={sizedUrl} height="200" alt={caption} />
      {caption && (
        <div>
          <em>{caption}</em>
        </div>
      )}
    </div>
  );
}

export default MessageImage;
