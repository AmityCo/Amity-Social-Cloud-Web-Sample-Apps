import { SyncState as Values } from "@amityco/js-sdk";

import { SyncingIcon, SyncedIcon } from "../Icons";

export function SyncState({ value }) {
  const MESSAGES = {
    [Values.Default]: "Idle",
    [Values.Syncing]: <SyncingIcon />,
    [Values.Synced]: <SyncedIcon />,
    [Values.Error]: "Error.",
  };

  return <em className="SyncState">{MESSAGES[value]}</em>;
}
