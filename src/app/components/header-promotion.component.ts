import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: '../pages/header-promotion.component.html',
  styleUrls: ['../styles/header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path: string = Path.url;
  top_banner:object = null;
  preload: boolean = false;

  constructor( private productsService: ProductsService) { }

  ngOnInit(): void {

    this.preload = true;

    this.productsService.getDataBanner()
      .subscribe(resp => {

        /*============================================================
        Devolvemos a la vista un banner
        =============================================================*/

        this.top_banner = JSON.parse(resp[Object.keys(resp)[0]].top_banner);
        this.preload = false;
    })

  }

}
