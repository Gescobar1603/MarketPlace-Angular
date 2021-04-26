import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

@Component({
  selector: 'app-header',
  templateUrl: '../pages/header.component.html',
  styleUrls: ['../styles/header.component.css']
})
export class HeaderComponent implements OnInit {

    path:String = Path.url;
    
    constructor() { }
    
    ngOnInit(): void {
    }

}
