import React from "react";

import { TextContent } from "./TextContent";

export function Deleted() {
  const text = <em>Message deleted</em>;
  return <TextContent data={{ text }} />;
}
