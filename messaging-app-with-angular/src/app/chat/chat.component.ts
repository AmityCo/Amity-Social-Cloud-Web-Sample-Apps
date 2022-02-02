import { Component } from "@angular/core";
import { ChannelRepository, ChannelType } from "@amityco/js-sdk";

// channel for demo
const DEFAULT_CHANNEL_ID = "simple-chat-demo";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class Chat {
  channelId = DEFAULT_CHANNEL_ID;
  overlay = true;

  async joinChannel() {
    await ChannelRepository.joinChannel({
      channelId: this.channelId,
      type: ChannelType.Standard
    });
    await ChannelRepository.startReading(this.channelId);
  }

  async changeChannel(value) {
    try {
      await ChannelRepository.stopReading(this.channelId);
    } catch (err) {}

    this.channelId = value;
    this.joinChannel();
  }

  toggleOverlay() {
    this.overlay = !this.overlay;
  }
}
