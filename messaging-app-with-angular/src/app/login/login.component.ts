import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  @Output() formSubmittedEvent = new EventEmitter<Object>();
  @ViewChild("persistent") persistentCheckbox;
  loginForm;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      name: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.status === "VALID") {
      this.formSubmittedEvent.emit({
        userId: this.loginForm.get("name").value,
        persistent: this.persistentCheckbox.nativeElement.checked
      });
    }
  }
}
