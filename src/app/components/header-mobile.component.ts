import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

@Component({
  selector: 'app-header-mobile',
  templateUrl: '../pages/header-mobile.component.html',
  styleUrls: ['../styles/header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  path:string = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
