import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    path:String = Path.url;
    
    constructor() { }
    
    ngOnInit(): void {
    }

}
