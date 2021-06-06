import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-breadcrum',
  templateUrl: '../pages/search-breadcrum.component.html',
  styleUrls: ['../styles/search-breadcrum.component.css']
})
export class SearchBreadcrumComponent implements OnInit {
  
  
  breadcrumb: string = null;
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

  	/*=============================================
		Capturamos el parámetro URL
		=============================================*/	

		this.breadcrumb = this.activateRoute.snapshot.params["param"].replace(/[_]/g, " ");

  }
  }


