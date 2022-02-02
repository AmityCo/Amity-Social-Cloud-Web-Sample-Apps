import { Component, Input, NgZone } from "@angular/core";

import { FileRepository } from "@amityco/js-sdk";

@Component({
  selector: "app-image-content",
  templateUrl: "./image-content.component.html"
})
export class ImageContent {
  @Input() data;
  @Input() fileId;
  sizedUrl;
  liveFile;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.liveFile = FileRepository.getFile(this.fileId);

    if (this.liveFile.model) {
      this.setFile(this.liveFile.model.fileUrl);
    } else {
      this.liveFile.once("dataUpdated", (model) => {
        this.setFile(model.fileUrl);
      });
    }
  }

  ngOnDestroy() {
    this.liveFile.dispose();
  }

  setFile(url) {
    this.ngZone.run(() => {
      this.sizedUrl = url.startsWith("blob:") ? url : `${url}?size=medium`;
    });
  }
}
