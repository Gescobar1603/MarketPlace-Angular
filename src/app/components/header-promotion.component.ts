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
  top_banner: Object = null;

  constructor( private productsService: ProductsService) { }

  ngOnInit(): void {

    this.productsService.getData()
      .subscribe(resp => {

        //console.log("resp", resp);

        /*============================================================
        Tomar la longitud del objeto
        =============================================================*/

        let a;

        let size = 0;

        for (a in resp) {

            size++

        }

        /*============================================================
         Generar un número aleatorio
        =============================================================*/

        let index = Math.floor(Math.random() * size);

        /*============================================================
        Devolvemos a la vista un banner aleatorio
        =============================================================*/

        this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);

    })

  }

}
