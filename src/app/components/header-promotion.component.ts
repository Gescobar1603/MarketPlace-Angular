import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

@Component({
  selector: 'app-header-promotion',
  templateUrl: '../pages/header-promotion.component.html',
  styleUrls: ['../styles/header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path:String = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
