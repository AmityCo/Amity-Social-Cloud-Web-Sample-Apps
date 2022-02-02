import { SyncState as Values } from "@amityco/js-sdk";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-sync-state",
  templateUrl: "./sync-state.component.html"
})
export class SyncState {
  @Input() value;
  syncValues = Values;
}
