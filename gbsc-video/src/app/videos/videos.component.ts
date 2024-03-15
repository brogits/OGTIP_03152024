import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { IVideo } from '../models/base-model';
import { AppService } from '../app.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  private modalService = inject(NgbModal);
	closeResult = '';

  constructor(private service: AppService, private router: Router) {

  }
  watchVideo(url: string) {
    localStorage.setItem('_vurl_', url)
    this.router.navigateByUrl('/view/1')
  }

  videos: IVideo[] = [

  ];

  ngOnInit(): void {
    this.service.fetchVideos().subscribe(rs => {
      this.videos = rs.value
    })
  }

}
