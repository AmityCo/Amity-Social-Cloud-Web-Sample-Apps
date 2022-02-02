import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";
import { MessageType } from "@amityco/js-sdk";

import { TextContent } from "./Content/text-content.component";
import { ImageContent } from "./Content/image-content.component";
import { FileContent } from "./Content/file-content.component";
import { currentUserId } from "../../client";

import { short } from "tiny-human-time";

const MAPPING = {
  [MessageType.Text]: TextContent,
  [MessageType.Image]: ImageContent,
  [MessageType.File]: FileContent
};

@Component({
  selector: "app-message-item",
  templateUrl: "./message-item.component.html",
  styleUrls: ["./message-item.component.css"]
})
export class MessageItem {
  @ViewChild("content", { read: ViewContainerRef }) content: ViewContainerRef;
  @Input() msg;
  currentUserId = currentUserId;
  timeString = "0s";

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges() {
    this.timeString = short(Date.now(), this.msg.createdAt);
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => this.renderContent());
  }

  renderContent() {
    this.content.clear();
    const classType: any = MAPPING[this.msg.type];
    const factory = this.resolver.resolveComponentFactory(classType);
    const component: any = this.content.createComponent(factory).instance;
    component.data = this.msg.data;
    component.fileId = this.msg.fileId;
  }
}
