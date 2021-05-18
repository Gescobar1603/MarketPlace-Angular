import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { ProductsService } from '../services/products.service';
import { OwlCarouselConfig, CarouselNavigation,SlickConfig, ProductLightbox } from '../funciones';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home-hot-today',
  templateUrl: '../pages/home-hot-today.component.html',
  styleUrls: ['../styles/home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

  path: string = Path.url;
  indexes: Array<any> = []
  renderizado: boolean = true;
  products: Array<any> = []
  cargando: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    this.cargando = true;
    let getProducts = [];
    let hoy = new Date();
    let fechaOferta = null;

    /*============================================================
    Tomamos la data de los productos
    =============================================================*/

    this.productsService.getDataProduct()
      .subscribe(resp => {

        /*============================================================
        Recorremos cada producto para separar las ofertas y el stock
        =============================================================*/

        let i;

        for (i in resp) {

          getProducts.push({

            "oferta": JSON.parse(resp[i].oferta),
            "stock": resp[i].stock

          })

          this.products.push(resp[i])
          
        }

        /*============================================================
        Recorremos cada oferta y stock para clasificar las ofertas actuales
        y los productos que si tengan el stock
        =============================================================*/
        
        for (i in getProducts) {

          fechaOferta = new Date(

            parseInt(getProducts[i]["oferta"][2].split("-")[0]),
            parseInt(getProducts[i]["oferta"][2].split("-")[1]),
            parseInt(getProducts[i]["oferta"][2].split("-")[2]),
          )

          if (hoy < fechaOferta && getProducts[i]["stock"]>0) {
            
            this.indexes.push(i)
            this.cargando =false;

            console.log(this.indexes)
          }
        
        }
 

      })
  }
/*============================================================
  Funcion que nos avisa cuando termina el renderizado de angular
  =============================================================*/

  callback() {

    if (this.renderizado) {

      this.renderizado = false;
      
      /*============================================================
      Seleccionar del DOM los elementos de la geleria Mixta
      =============================================================*/

      let galleryMix_1 = $(".galleryMix_1");
      let galleryMix_2 = $(".galleryMix_2");
      let galleryMix_3 = $(".galleryMix_3");


      for (let i = 0; i < galleryMix_1.length; i++){

        /*============================================================
        Recorremos la galeria de fotografias de cada producto
        =============================================================*/
      
        for (let f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++){

          /*============================================================
            Agregar imágenes grandes
          =============================================================*/
  
          $(galleryMix_2[i]).append(
         
            `<div class="item">
                <a href="assets/img/products/${($(galleryMix_1[i]).attr("category"))}/deal-hot/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">  
                  <img src="assets/img/products/${($(galleryMix_1[i]).attr("category"))}/deal-hot/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
                </a>              
              </div>`
            
          )
          /*============================================================
            Agregar imágenes pequeñas
          =============================================================*/
            
          $(galleryMix_3[i]).append(

            `<div class="item ">
                <img src="assets/img/products/${($(galleryMix_1[i]).attr("category"))}/deal-hot/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
            </div>`

          )
        }

      }

      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      SlickConfig.fnc();
      ProductLightbox.fnc()
    }
  }
  
}
