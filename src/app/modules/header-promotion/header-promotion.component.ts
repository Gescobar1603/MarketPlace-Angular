import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path:String = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
