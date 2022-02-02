import { Component, Input } from "@angular/core";
import * as Reactions from "../../constants/reactions";

@Component({
  selector: "app-reaction-bar",
  templateUrl: "./reaction-bar.component.html",
  styleUrls: ["./reaction-bar.component.css"]
})
export class ReactionBar {
  @Input() reactionsCount;
  @Input() reactions = {};
  REACTION_ICONS = Reactions.REACTION_ICONS;
}
