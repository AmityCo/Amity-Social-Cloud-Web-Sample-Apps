import { Component, Input } from "@angular/core";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.css"]
})
export class ChatRoom {
  @Input() channelId;
}
