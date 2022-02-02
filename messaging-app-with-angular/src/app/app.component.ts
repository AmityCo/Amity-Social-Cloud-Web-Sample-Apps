import { Component } from "@angular/core";
import { currentUserId, connectClient } from "./client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  userId = localStorage.getItem("userId");

  ngOnInit() {
    if (this.userId) this.login(this.userId);
  }

  async handleSubmit(obj) {
    if (obj.persistent) localStorage.setItem("userId", obj.userId);
    this.login(obj.userId);
  }

  async login(userId) {
    await connectClient(userId);
    this.userId = currentUserId;
  }
}
