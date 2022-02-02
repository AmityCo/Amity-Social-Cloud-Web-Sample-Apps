import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ChannelRepository, ChannelFilter } from "@amityco/js-sdk";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})
export class ChannelList {
  @Output() clickEvent = new EventEmitter<string>();
  @Input() activeChannelId;
  @Input() searchQuery = "";
  channels = [];
  collection;
  top = true;

  ngOnChanges() {
    this.collection?.dispose();
    this.collection = ChannelRepository.queryChannels({
      keyword:
        this.searchQuery && this.searchQuery.length
          ? this.searchQuery
          : undefined,
      filter: this.searchQuery ? ChannelFilter.All : ChannelFilter.Member
    });

    this.collection.on("dataUpdated", (models) => {
      this.channels = models;
    });
  }

  ngOnDestroy() {
    this.collection?.dispose();
  }

  onScroll(e) {
    this.top = e.target.scrollTop <= 0;

    if (!this.collection.hasMore) return;

    const visibleHeight = e.target.scrollHeight - e.target.clientHeight;

    if (e.target.scrollTop >= visibleHeight - 1) {
      this.collection.current?.nextPage();
    }
  }

  channelId(index, obj) {
    return obj.channelId;
  }

  joinChannel(value) {
    this.clickEvent.emit(value);
  }
}
