import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-home-promotion',
  templateUrl: '../pages/home-promotion.component.html',
  styleUrls: ['../styles/home-promotion.component.css']
})
export class HomePromotionComponent implements OnInit {

  path: string = Path.url;
  banner_default: Array<any> = [];
  preload: boolean = false;
  url: Array<any> = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    this.preload = true;

    this.productsService.getDataBannerDefault()
      .subscribe(resp => {


        let index = 0

        this.productsService.getLimitData2(Object.keys(resp)[index], 5)
          .subscribe(resp => {

            let i;

            for (i in resp) {

              this.banner_default.push((resp[i].banner_default))
              this.url.push(resp[i].nombre.replace(/\s+/g, ''))

              this.preload = false;
              
            }
          })

      })

  }

}
