import { SyncState } from "@amityco/js-sdk";

import { SyncingIcon, SyncedIcon } from "./Icons";

export default function Sync({ value }) {
  const MESSAGES = {
    [SyncState.Default]: "Idle",
    [SyncState.Syncing]: <SyncingIcon />,
    [SyncState.Synced]: <SyncedIcon />,
    [SyncState.Error]: "Error."
  };

  return <em className="syncstate">{MESSAGES[value]}</em>;
}
