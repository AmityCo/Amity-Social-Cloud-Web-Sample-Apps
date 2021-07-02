import { CareIcon, LikeIcon, LoveIcon } from "../Icons";

export const LIKE_REACTION = "like";
export const LOVE_REACTION = "love";
export const CARE_REACTION = "care";

export const REACTIONS = [LIKE_REACTION, LOVE_REACTION, CARE_REACTION];

export const REACTION_ICONS = {
  [LIKE_REACTION]: LikeIcon,
  [LOVE_REACTION]: LoveIcon,
  [CARE_REACTION]: CareIcon,
};
