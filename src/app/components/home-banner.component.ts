import { Component, OnInit } from '@angular/core';
import { Path } from '../config';
import { OwlCaroulselConfig, BackgroundImage } from '../funciones';

import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: '../pages/home-banner.component.html',
  styleUrls: ['../styles/home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  path: string = Path.url;
  banner_home: Array<any> = [];
  renderizado: boolean = true;
  preload: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    this.preload = true;

    this.productsService.getDataSlider()
      .subscribe(resp => {

        let i;

        let size = 0;

        let index = 0
        
        for (i in resp) {

          size++

        }

        if (size > 5) {
          
          index = Math.floor(Math.random() * (size - 5));
      
        }
        
 

        this.productsService.getLimitData(Object.keys(resp)[index], 5)
          .subscribe(resp => {

            let i;
            for (i in resp) {

              this.banner_home.push(JSON.parse(resp[i].horizontal_slider))

              this.preload = false;
              
            }
      
          })
    



      })

  }
 /*============================================================
  Funcion que nos avisa cuando termina el renderizado de angular
  =============================================================*/

  callback() {

    if (this.renderizado) {

        this.renderizado = false;
  
      OwlCaroulselConfig.fnc()
      BackgroundImage.fnc();

    }
  }

}
