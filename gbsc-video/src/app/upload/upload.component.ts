import { Component } from '@angular/core';
import { AppService } from '../app.services';
import { IApiResult } from '../models/base-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private service: AppService, private spinner: NgxSpinnerService) {
  }
  MAX_FILE_SIZE = 104857600
  model = {
    title: '',
    description: '',
    filename: '',
  }

  hasError = false;
  errorMessage = '';
  file: File = {} as File;
  uploading = false;
  onUploadFile() {

    if (this.model.filename.length === 0) {
      this.setConsoleDisplay(true, 'Video file is required')
      return;
    }
    if (this.model.title.length === 0) {
      this.setConsoleDisplay(true, 'Video Title is required')
      return;
    }

    if (this.model.description.length === 0) {
      this.setConsoleDisplay(true, 'Video description is required')
      return;
    }

    const formData = new FormData();
    formData.append('video', this.file);
    formData.append('title', this.model.title);
    formData.append('description', this.model.description);
    this.uploading = true;
    this.spinner.show();
    const subs = this.service.uploadVideo(formData).subscribe((result:IApiResult) => {
      this.uploading = false;
      this.spinner.hide();
      this.setConsoleDisplay(true, result.message)
      subs.unsubscribe();
      if (result.success) {
        this.onReset();
      }
    }, error => {
      this.spinner.hide();
      this.setConsoleDisplay(true, error.message)
    })

  }

  onReset() {
    this.model.title = '';
    this.model.description = ''
    this.errorMessage= ''
    this.hasError = false
    this.model.filename= ''
  }

  onFileSelected(ev:any){
    this.file = ev.target.files[0];
    if (this.file.size > this.MAX_FILE_SIZE) {
      this.setConsoleDisplay(true, 'Maxilum allowed file size is 100mb.');
      return;
    }
    this.model.filename = this.file.name;
  }

  setConsoleDisplay(showConsole: boolean, message: string) {
    this.hasError = showConsole;
    this.errorMessage = message;
  }

}
