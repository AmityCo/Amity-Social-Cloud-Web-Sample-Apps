import { Component, Input, NgZone, HostListener } from "@angular/core";
import { MessageRepository } from "@amityco/js-sdk";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageList {
  @Input() channelId;
  collection;
  messages;

  constructor(private ngZone: NgZone) {}

  ngOnChanges() {
    this.collection?.dispose();
    this.collection = MessageRepository.queryMessages({
      channelId: this.channelId
    });

    this.collection.on("dataUpdated", () => {
      this.ngZone.run(() => {
        this.messages = this.collection.models;
      });
    });
  }

  ngOnDestroy() {
    this.collection?.dispose();
  }

  @HostListener("scroll", ["$event"])
  onScroll(e) {
    if (!this.collection.hasMore) return;

    const el = e.target;
    const top = el.scrollHeight - el.clientHeight;
    const scroll = -el.scrollTop;

    if (top - scroll <= 1) {
      this.collection.nextPage();
    }
  }

  messageId(index, obj) {
    return obj.messageId;
  }
}
