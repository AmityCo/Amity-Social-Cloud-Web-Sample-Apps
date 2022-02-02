import React from "react";
import "./index.css";

import { REACTION_ICONS } from "../ReactionPicker/constants";

export function ReactionBar({ reactionsCount, reactions }) {
  return (
    <div className="ReactionBar">
      {Object.entries(REACTION_ICONS)
        .filter(([reaction]) => reactions[reaction] > 0)
        .map(([reaction, Icon], i, a) => (
          <span
            key={reaction}
            className="ReactionMedal"
            style={{ zIndex: a.length - i }}
          >
            <Icon />
          </span>
        ))}
      {reactionsCount > 1 && (
        <span className="ReactionCount">{reactionsCount}</span>
      )}
    </div>
  );
}
