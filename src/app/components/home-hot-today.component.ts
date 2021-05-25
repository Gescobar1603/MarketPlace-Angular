import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { ProductsService } from '../services/products.service';
import { VentasService } from '../services/ventas.service';

import { OwlCarouselConfig, CarouselNavigation,SlickConfig, ProductLightbox, CountDown , Rating, ProgressBar} from '../funciones';

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
  renderizadoTopVentas: boolean = true;
  products: Array<any> = []
  cargando: boolean = false;
  topVentas: Array<any> = [];
  topVentasBloque: Array<any> = [];

  constructor(private productsService: ProductsService, private ventasService: VentasService) { }

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
          }
        }
      })
  
  /*============================================================
    Tomamos la data de las ventas
  =============================================================*/
    
    let getVentas = [];
    this.ventasService.getDataVentas().subscribe(resp => {
      
        /*============================================================
          Recorremos cada venta para separar los productos y las cantidades
        =============================================================*/
      let i;

      for (i in resp) {

        getVentas.push({
            
          "producto":resp[i].producto,
          "cantidad":resp[i].cantidad

        })
        
      }

      /*============================================================
        Ordenamos de mayor a menor el arreglo de objetos
      =============================================================*/

      getVentas.sort(function (a, b) {
        
        return (b.cantidad - a.cantidad)
      })

       /*============================================================
        Sacamos del arreglo los productos repetidos dejando los de mayor venta
      =============================================================*/

      let filtrarVentas = [];

      getVentas.forEach(venta => {

        if (!filtrarVentas.find(resp => resp.producto == venta.producto)) {

          const { producto, cantidad } = venta;
          
          filtrarVentas.push({ producto, cantidad })
          
        }

      })
       /*============================================================
        Filtramos la data de productos buscadno coincidencias con las ventas
      =============================================================*/

      let block = 0;

      filtrarVentas.forEach((venta, index) => {



      /*============================================================
        Filtramos hasta 20 ventas
      =============================================================*/
        if (index < 20) {

          block++;
          
          this.productsService.getFilterData("nombre", venta.producto)
            .subscribe(resp => {

              let i;
              
              for (i in resp) {

                this.topVentas.push(resp[i])

              }

            })
          


        }
        
      })
    /*============================================================
      Enviamos el maximo de bloques apra mostrar 4 productos por bloque
      =============================================================*/
      for (let i = 0; i < Math.round(block / 5); i++){
        
        this.topVentasBloque.push(i)


      }
      console.log(this.topVentasBloque)
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

      ProgressBar.fnc();

        }      
    }
/*============================================================
  Funcion que nos avisa cuando termina el renderizado de angular
  =============================================================*/

  callBackTopVentas(topVentas) {

    if (this.renderizadoTopVentas) {

      this.renderizadoTopVentas = false;
      
      /*=============================================
      Capturamos la cantidad de bloques que existe en el DOM
      =============================================*/
      let topVentaBloque = $(".topVentaBloque");
      let top20Array = [];


      /*=============================================
      Ejecutamos en SetTimeOut - por cada bloque un segundo de espera
      =============================================*/
      
      setTimeout(function () {

  
        console.log(topVentaBloque.length)
        
        for (let i = 0; i < topVentaBloque.length; i++) {

          /*=============================================
          Agrupamos la cantidad de 4 productos por bloque
          =============================================*/
        
          top20Array.push(

						topVentas.slice(i*topVentaBloque.length, (i*topVentaBloque.length)+topVentaBloque.length)
          )

    

          /*=============================================
					Hacemos un recorrido por el nuevo array de objetos
					=============================================*/	

					let f;

          for (f in top20Array[i]) {

            /*=============================================
            Definimos si el precio del producto tiene oferta o no
            =============================================*/
            let precio;
            let tipo;
            let valor;
            let oferta;

            if (top20Array[i][f].oferta != "") {
              
              tipo = JSON.parse(top20Array[i][f].oferta)[0];
              valor = JSON.parse(top20Array[i][f].oferta)[1];

              if(tipo == "Descuento"){

                oferta = (top20Array[i][f].precio - (top20Array[i][f].precio * valor/100)).toFixed(2)

              }

              if(tipo == "Fijo"){

                oferta = valor
                
              }

              precio = `<p class="ps-product__price sale">$${oferta} <del>$${top20Array[i][f].precio} </del></p>`;
           
            } else {

							precio =  `<p class="ps-product__price">$${top20Array[i][f].precio} </p>`;

						}
            

            

						$(topVentaBloque[i]).append(`

            <div class="ps-product--horizontal">

            <div class="ps-product__thumbnail">
                <a href="product/${top20Array[i][f].nombre.replace(/\s+/g, '')}">
                    <img src="assets/img/products/${top20Array[i][f].category}/${top20Array[i][f].imagen}" alt="">
                </a>
            </div>

            <div class="ps-product__content">

                <a class="ps-product__title" href="product/${top20Array[i][f].nombre.replace(/\s+/g, '')}">${top20Array[i][f].nombre.substr(0,35) } ...</a>

                <div class="ps-product__rating">

                    <select class="ps-rating" data-read-only="true">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="2">5</option>
                            </select>

                    <span>01</span>

                </div>

                ${precio}

            </div>

        </div>
						`)

          }
        }
				/*=============================================
				Modificamos el estilo del plugin OWL Carousel
				=============================================*/	
				$(".owl-dots").css({"bottom":"0"})
				$(".owl-dot").css({"background":"#ddd"})

      }, topVentaBloque.length*400)
    }
  }
}


