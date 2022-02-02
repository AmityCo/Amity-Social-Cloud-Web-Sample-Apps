import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";
import { FilePreview } from "./Preview/file-preview.component";
import { ImagePreview } from "./Preview/image-preview.component";
import { FileType } from "@amityco/js-sdk";

const MAPPING = {
  [FileType.Image]: ImagePreview,
  [FileType.File]: FilePreview
};

@Component({
  selector: "app-attachment",
  templateUrl: "./attachment.component.html",
  styleUrls: ["./attachment.component.css"]
})
export class Attachment {
  @Input() file;
  @Output() onDelete = new EventEmitter<void>();
  @ViewChild("preview", { read: ViewContainerRef }) preview: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    Promise.resolve(null).then(() => this.renderPreview());
  }

  renderPreview() {
    this.preview.clear();
    const classType: any = MAPPING[this.file.type];
    const factory = this.resolver.resolveComponentFactory(classType);
    const component: any = this.preview.createComponent(factory).instance;
    component.fileId = this.file.fileId;
  }

  delete() {
    this.onDelete.emit();
  }
}
