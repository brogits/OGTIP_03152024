import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { UploadComponent } from './upload/upload.component';
import { ViewVideoComponent } from './view-video/view-video.component';

const routes: Routes = [
  { path: '', component: VideosComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'view/:id', component: ViewVideoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
