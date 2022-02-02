import {
  Component,
  ViewChild,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";

@Component({
  selector: "app-reaction-icon",
  templateUrl: "./reaction-icon.component.html"
})
export class ReactionIcon {
  @ViewChild("icon", { read: ViewContainerRef }) icon: ViewContainerRef;

  @Input() iconClass;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    this.icon.clear();
    const factory = this.resolver.resolveComponentFactory(this.iconClass);
    this.icon.createComponent(factory);
  }
}
