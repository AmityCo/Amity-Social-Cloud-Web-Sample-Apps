import { HostListener, Component, Input } from "@angular/core";
import { MessageRepository } from "@amityco/js-sdk";

import * as Reactions from "../../constants/reactions";

@Component({
  selector: "app-reaction-picker",
  templateUrl: "./reaction-picker.component.html",
  styleUrls: ["./reaction-picker.component.css"]
})
export class ReactionPicker {
  @Input() messageId;
  @Input() myReactions = [];
  open = false;
  wasInside = false;
  REACTION_ICONS = Reactions.REACTION_ICONS;

  @HostListener("click")
  clickInside() {
    this.wasInside = true;
  }

  @HostListener("document:click")
  clickOutside() {
    if (!this.wasInside) this.open = false;
    this.wasInside = false;
  }

  toggleBar() {
    this.open = !this.open;
  }

  toggleReaction(reactionName) {
    const action = this.myReactions.includes(reactionName)
      ? "removeReaction"
      : "addReaction";
    MessageRepository[action]({
      messageId: this.messageId,
      reactionName
    });
    this.open = false;
  }
}
