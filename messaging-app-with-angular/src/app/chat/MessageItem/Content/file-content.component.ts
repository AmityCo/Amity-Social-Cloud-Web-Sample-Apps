import { Component, Input, NgZone } from "@angular/core";

import { FileRepository } from "@amityco/js-sdk";

import * as prettyBytes from "pretty-bytes";

@Component({
  selector: "app-file-content",
  templateUrl: "./file-content.component.html"
})
export class FileContent {
  @Input() data;
  @Input() fileId;
  model;
  prettyBytes = prettyBytes;
  liveFile;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.liveFile = FileRepository.getFile(this.fileId);

    if (this.liveFile.model) {
      this.model = this.liveFile.model;
    } else {
      this.liveFile.once("dataUpdated", () => {
        this.ngZone.run(() => {
          this.model = this.liveFile.model;
        });
      });
    }
  }

  ngOnDestroy() {
    this.liveFile?.dispose();
  }
}
