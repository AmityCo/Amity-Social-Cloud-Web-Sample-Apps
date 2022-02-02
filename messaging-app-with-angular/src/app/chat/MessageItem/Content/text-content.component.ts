import { Component, Input } from "@angular/core";

@Component({
  selector: "app-text-content",
  templateUrl: "./text-content.component.html"
})
export class TextContent {
  @Input() data;
  @Input() fileId;
}
