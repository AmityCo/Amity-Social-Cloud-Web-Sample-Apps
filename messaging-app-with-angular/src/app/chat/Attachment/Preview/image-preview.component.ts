import { Component, Input, NgZone } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { FileRepository } from "@amityco/js-sdk";

@Component({
  selector: "app-image-preview",
  templateUrl: "./image-preview.component.html"
})
export class ImagePreview {
  @Input() fileId;
  sizedUrl;
  liveFile;

  constructor(private ngZone: NgZone, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.liveFile = FileRepository.getFile(this.fileId);
    if (this.liveFile.model) {
      this.setUrl(this.liveFile.model.fileUrl);
    } else {
      this.liveFile.once("dataUpdated", (model) => {
        this.setUrl(model.fileUrl);
      });
    }
  }

  ngOnDestroy() {
    this.liveFile?.dispose();
  }

  setUrl(url) {
    this.ngZone.run(() => {
      this.sizedUrl = this.sanitizer.bypassSecurityTrustUrl(
        url.startsWith("blob:") ? url : `${url}?size=medium`
      );
    });
  }
}
