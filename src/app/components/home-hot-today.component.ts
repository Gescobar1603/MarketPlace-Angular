import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { ProductsService } from '../services/products.service';
import { OwlCarouselConfig, CarouselNavigation,SlickConfig, ProductLightbox, CountDown , Rating} from '../funciones';

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

      /*============================================================
      Seleccionar del Dom los elementos de las ofertas
      =============================================================*/
    
      let oferta_1 = $(".oferta_1");
      let oferta_2 = $(".oferta_2");
      let oferta_3 = $(".oferta_3");

      /*============================================================
      Seleccionar del Dom los elementos de las reseñas
      =============================================================*/
    
      let review_1 = $(".review_1");
      let review_2 = $(".review_2");
      let review_3 = $(".review_3");

          

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

            `<div class="item">
                <img src="assets/img/products/${($(galleryMix_1[i]).attr("category"))}/deal-hot/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
            </div>`

          )

        }
          /*============================================================
          Capturamos el array de ofertas de cada producto
          =============================================================*/
            
          let oferta = JSON.parse($(oferta_1[i]).attr("oferta"));
            
          /*=============================================
  				Capturamos el precio de cada producto
  				=============================================*/	
  
          let precio = Number($(oferta_1[i]).attr("precio"));
          
          /*=============================================
          Preguntamos si es descuento
          =============================================*/	

          if(oferta[0] == "Descuento"){

            $(oferta_1[i]).html(
  
              `<span>Ahorra <br> $${(precio * oferta[1]/100).toFixed(2) } </span>`
  
            )
  
            $(oferta_2[i]).html(`$${(precio-(precio * oferta[1]/100)).toFixed(2)}`)	
  
          }
  
          /*=============================================
          Preguntamos si es precio fijo
          =============================================*/	
  
          if(oferta[0] == "Fijo"){
  
            $(oferta_1[i]).html(
  
              `<span>Save <br> $${(precio-oferta[1]).toFixed(2) }</span>`
  
            )
  
            $(oferta_2[i]).html(`$${oferta[1]}`)	
  
          }

          /*=============================================
  				Agregamos la fecha al descontador
  				=============================================*/	
  
  				$(oferta_3[i]).attr("data-time", 
  
              new Date(
      
              parseInt(oferta[2].split("-")[0]),
              parseInt(oferta[2].split("-")[1])-1,
              parseInt(oferta[2].split("-")[2])
    
              )
          )
        
  				/*=============================================
  				Calculamos el total de las calificaciones de las reseñas
  				=============================================*/	
  
  				let totalReview = 0;
  
  				for(let f = 0; f < JSON.parse($(review_1[i]).attr("reviews")).length; f++){
  
  					totalReview += Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"])
  					
          }

				/*=============================================
				Imprimimos el total de las calificaciones para cada producto
				=============================================*/	

				let rating = Math.round(totalReview/JSON.parse($(review_1[i]).attr("reviews")).length);

				$(review_3[i]).html(rating);


				for(let f = 1; f <= 5; f++){
					
					$(review_2[i]).append(

						`<option value="2">${f}</option>`
					)

					if(rating == f){

						$(review_2[i]).children('option').val(1)

					}

				}
      }

			/*=============================================
			Ejecutar funciones globales con respecto a la galería mixta
			=============================================*/
	
			OwlCarouselConfig.fnc();
			CarouselNavigation.fnc();
			SlickConfig.fnc();
			ProductLightbox.fnc();			

			/*=============================================
			Ejecutar funciones globales con respecto a las ofertas
			=============================================*/			

			CountDown.fnc();

			/*=============================================
			Ejecutar funciones globales con respecto a las reseñas
			=============================================*/			

			Rating.fnc();

			/*=============================================
			Ejecutar funciones globales con respecto al Stock
			=============================================*/			

			//ProgressBar.fnc()



        }

      
    }

}

