import { Component, Input, NgZone } from "@angular/core";
import { ChannelRepository } from "@amityco/js-sdk";

@Component({
  selector: "app-channel-header",
  templateUrl: "./channel-header.component.html",
  styleUrls: ["./channel-header.component.css"]
})
export class ChannelHeader {
  @Input() channelId;
  channel;
  liveObject;

  constructor(private ngZone: NgZone) {}

  ngOnChanges() {
    this.liveObject?.dispose();
    this.liveObject = ChannelRepository.getChannel(this.channelId);
    this.liveObject.on("dataUpdated", (model) => {
      this.ngZone.run(() => {
        this.channel = model;
      });
    });
  }

  ngOnDestroy() {
    this.liveObject?.dispose();
  }
}
