import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

@Component({
  selector: 'app-home-promotion',
  templateUrl: '../pages/home-promotion.component.html',
  styleUrls: ['../styles/home-promotion.component.css']
})
export class HomePromotionComponent implements OnInit {

  path: string = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
