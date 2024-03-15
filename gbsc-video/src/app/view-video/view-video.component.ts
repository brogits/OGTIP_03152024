import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss']
})
export class ViewVideoComponent implements OnInit {
  constructor(private route: ActivatedRoute) {

  }
  videoUrl = '';
  ngOnInit(): void {
    this.videoUrl = localStorage.getItem('_vurl_') as string
  }

}

