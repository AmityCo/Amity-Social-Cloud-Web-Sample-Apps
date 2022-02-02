import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removereactions",
  pure: false
})
export class RemoveReactions implements PipeTransform {
  transform(items: any[], reactions: Object): any {
    return items.filter((item) => reactions[item.key] > 0);
  }
}
