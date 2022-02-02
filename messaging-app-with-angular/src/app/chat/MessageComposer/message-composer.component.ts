import { Component, Input, ViewChild } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { FileType, FileRepository, MessageRepository } from "@amityco/js-sdk";

@Component({
  selector: "app-message-composer",
  templateUrl: "./message-composer.component.html",
  styleUrls: ["./message-composer.component.css"]
})
export class MessageComposer {
  @ViewChild("fileInput") fileInput;
  @ViewChild("imageInput") imageInput;
  @Input() channelId;
  chatForm;
  file;

  constructor(private formBuilder: FormBuilder) {
    this.chatForm = formBuilder.group({
      message: ["", [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.chatForm.status === "VALID" || this.file) {
      let channelId = this.channelId;
      let text, caption, fileId, imageId;
      text = caption = this.chatForm.get("message").value?.length
        ? this.chatForm.get("message").value
        : undefined;
      imageId = fileId = this.file.model.fileId;

      if (!this.file) {
        MessageRepository.createTextMessage({ channelId, text });
      } else if (this.file.model.type === FileType.Image) {
        MessageRepository.createImageMessage({ channelId, imageId, caption });
      } else if (this.file.model.type === FileType.File) {
        MessageRepository.createFileMessage({ channelId, fileId, caption });
      }
      this.chatForm.reset();
      this.resetFiles();
    }
  }

  handleFileInput(files) {
    const file = files[0];
    this.file = undefined;
    setTimeout(() => {
      this.file = FileRepository.createFile({ file });
    });
  }

  resetFiles() {
    if (this.file) this.file.dispose();
    this.file = undefined;
    this.fileInput.nativeElement.value = "";
    this.imageInput.nativeElement.value = "";
  }
}
