import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

@Component({
  selector: 'app-home-banner',
  templateUrl: '../pages/home-banner.component.html',
  styleUrls: ['../styles/home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  path: string = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
