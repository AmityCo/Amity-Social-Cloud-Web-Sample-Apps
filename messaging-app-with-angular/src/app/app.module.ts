import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import * as ChatComponents from "./chat/chat-components";
import * as ChatEntryComponents from "./chat/chat-entry-components";

@NgModule({
  declarations: [AppComponent, LoginComponent, Object.values(ChatComponents)],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Object.values(ChatEntryComponents)]
})
export class AppModule {}
