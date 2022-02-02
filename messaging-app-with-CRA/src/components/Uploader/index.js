import { useRef } from "react";
import "./index.css";

import { useUnmount } from "react-use";

import { FileRepository } from "@amityco/js-sdk";

export function Uploader({ children, onChange = () => {}, ...rest }) {
  const file = useRef();

  useUnmount(() => {
    if (file.current) file.current.dispose();
  });

  const handleFile = (e) => {
    window.test = e.target.files[0];

    file.current = FileRepository.createFile({
      file: e.target.files[0],
    });

    onChange(file.current.model);
    file.current.on("dataUpdated", onChange);
  };

  return (
    <label className="Uploader">
      {children}
      <input type="file" {...rest} onChange={handleFile} />
    </label>
  );
}
