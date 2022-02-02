import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as humanize from "tiny-human-time";

@Component({
  selector: "app-channel-item",
  templateUrl: "./channel-item.component.html",
  styleUrls: ["./channel-item.component.css"]
})
export class ChannelItem {
  @Output() clickEvent = new EventEmitter<string>();
  @Input() channel;
  @Input() active;
  timeString = "";

  ngOnChanges() {
    this.timeString = humanize(Date.now(), this.channel.lastActivity);
  }

  joinChannel() {
    this.clickEvent.emit(this.channel.channelId);
  }
}
