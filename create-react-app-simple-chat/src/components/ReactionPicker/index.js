import React, { useState, useEffect, useRef } from "react";
import "./index.css";

import { MessageRepository } from "@amityco/js-sdk";

import { REACTION_ICONS } from "./constants";

export function ReactionPicker({ messageId, myReactions = [] }) {
  const [open, setOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const listener = (e) => {
      if (!ref.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  const toggleBar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setOpen(true);
  };

  const toggleReaction = (reactionName) => async (e) => {
    if (!open) return;

    e.preventDefault();
    e.stopPropagation();

    const action = myReactions.includes(reactionName)
      ? "removeReaction"
      : "addReaction";

    await MessageRepository[action]({
      messageId,
      reactionName,
    });

    setOpen(false);
  };

  return (
    <span ref={ref} className="ReactionPicker">
      <span onClick={toggleBar}>React</span>
      {open && (
        <div className="ReactionButtons">
          {Object.entries(REACTION_ICONS).map(([reaction, Icon]) => (
            <button
              key={reaction}
              rel={reaction}
              className={`ReactionButton ${
                myReactions.includes(reaction) ? "active" : ""
              }`}
              onClick={toggleReaction(reaction)}
            >
              <Icon />
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
