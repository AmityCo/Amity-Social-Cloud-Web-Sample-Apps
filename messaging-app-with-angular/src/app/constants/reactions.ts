import { IconCare, IconLike, IconLove } from "../chat/Icons/icons.component";

export const LIKE_REACTION = "like";
export const LOVE_REACTION = "love";
export const CARE_REACTION = "care";

export const REACTIONS = [LIKE_REACTION, LOVE_REACTION, CARE_REACTION];

export const REACTION_ICONS = {
  [LIKE_REACTION]: IconLike,
  [LOVE_REACTION]: IconLove,
  [CARE_REACTION]: IconCare
};
