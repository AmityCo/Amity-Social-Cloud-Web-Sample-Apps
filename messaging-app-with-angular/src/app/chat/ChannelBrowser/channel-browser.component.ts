import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-channel-browser",
  templateUrl: "./channel-browser.component.html",
  styleUrls: ["./channel-browser.component.css"]
})
export class ChannelBrowser {
  @Output() clickEvent = new EventEmitter<string>();
  @Input() activeChannelId;
  timer;
  searchQuery;

  handleSearchQuery(e) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.searchQuery = e.target.value;
    }, 200);
  }

  joinChannel(value) {
    this.clickEvent.emit(value);
  }
}
