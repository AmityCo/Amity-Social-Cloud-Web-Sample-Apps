import { Component, Input, NgZone } from "@angular/core";
import { FileRepository } from "@amityco/js-sdk";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.css"]
})
export class Image {
  @Input() fileId;
  file;
  liveFile;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.liveFile = FileRepository.getFile(this.fileId);

    if (this.liveFile.model) {
      this.file = this.liveFile.model;
    } else {
      this.liveFile.once("dataUpdated", () => {
        this.ngZone.run(() => {
          this.file = this.liveFile.model;
        });
      });
    }
  }

  ngOnDestroy() {
    this.liveFile?.dispose();
  }
}
