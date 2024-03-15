import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { IApiResult, IVideo } from './models/base-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient) {

  }

  uploadVideo(formData: FormData){
    return this.httpClient.post<IApiResult>('http://localhost:6069/api/vids/post-video', formData)
  }

  fetchVideos(){
    return this.httpClient.get<IApiResult>('http://localhost:6069/api/vids/videos')
  }

  generateId() {
    return (new Date()).getTime()
  }


}
