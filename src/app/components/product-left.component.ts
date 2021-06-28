import { Component, OnInit } from '@angular/core';
import { Path } from '../config';
import { Rating,
  DinamicRating, 
  DinamicReviews, 
  DinamicPrice,
  CountDown,
  ProgressBar,
  Tabs,
  SlickConfig,
  ProductLightbox,
  Quantity, Tooltip
} from '../funciones';
  
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../services/products.service';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-product-left',
  templateUrl: '../pages/product-left.component.html',
  styleUrls: ['../styles/product-left.component.css']
})
export class ProductLeftComponent implements OnInit {

  path:string = Path.url;	
  product:any[]= [];
  rating:any[] = [];
  reviews:any[] = [];
  price:any[] = [];
  cargando:boolean = false;
  render:boolean = true;
  countd:any[] = [];
  gallery:any[] = [];
  renderGallery:boolean = true;
  video:string = null;
  tags:string = null;
  totalReviews: String;
  oferta:boolean = false;


  constructor(private activateRoute: ActivatedRoute,
            private productsService: ProductsService,
            private usersService: UsersService,
            private router: Router) { }

  ngOnInit(): void {

    this.cargando = true;
  
    this.productsService.getFilterData("url", this.activateRoute.snapshot.params["param"])  
    .subscribe( resp => {
      
      this.productsFnc(resp);		

    })

  }

/*=============================================
Declaramos función para mostrar los productos recomendados
=============================================*/	

  productsFnc(response){

    this.product = [];

  /*=============================================
  Hacemos un recorrido por la respuesta que nos traiga el filtrado
  =============================================*/	

    let i;
    let getProduct = [];

    for(i in response){

    getProduct.push(response[i]);						
      
  }

  /*=============================================
  Filtramos el producto
  =============================================*/

  getProduct.forEach((product, index)=>{

    this.product.push(product);
    
    this.rating.push(DinamicRating.fnc(this.product[index]));
    
    this.reviews.push(DinamicReviews.fnc(this.rating[index]));

    this.price.push(DinamicPrice.fnc(this.product[index]));

    /*=============================================
    Agregamos la fecha al descontador
    =============================================*/ 
    
    if(this.product[index].oferta != ""){

      let today = new Date();

      let offerDate = new Date(

        parseInt(JSON.parse(this.product[index].oferta)[2].split("-")[0]),
        parseInt(JSON.parse(this.product[index].oferta)[2].split("-")[1])-1,
        parseInt(JSON.parse(this.product[index].oferta)[2].split("-")[2])

      )

      if(today < offerDate){

        this.oferta = true;

        const date = JSON.parse(this.product[index].oferta)[2]; 
         
        this.countd.push(

          new Date(
            parseInt(date.split("-")[0]),
            parseInt(date.split("-")[1])-1,
            parseInt(date.split("-")[2])

          )

        )

      }

    }

    /*=============================================
    Gallery
    =============================================*/

    this.gallery.push(JSON.parse(this.product[index].gallery)) 

    /*=============================================
    Video
    =============================================*/

    if(JSON.parse(this.product[index].video)[0] == "youtube"){

      this.video = `https://www.youtube.com/embed/${JSON.parse(this.product[index].video)[1]}?rel=0&autoplay=0 `

    }



   /*=============================================
    Agregamos los tags
    =============================================*/ 

    this.tags = this.product[index].tag.split(",");

    /*=============================================
      Total Reviews
      =============================================*/
      this.totalReviews = JSON.parse(this.product[index].reviews).length;


    this.cargando = false;

  })

}

    /*=============================================
    Función Callback()
    =============================================*/ 

    callback(){

      if(this.render){
  
        this.render = false;
  
        Rating.fnc();
        CountDown.fnc();
        ProgressBar.fnc();
        Tabs.fnc();
        Quantity.fnc();
        Tooltip.fnc(); 
  
              /*=============================================
              Agregamos detalles del producto
              =============================================*/ 
  
              if($(".ps-product__variations").attr("specification") != ""){
  
                  /*=============================================
                  Recorremos el array de objetos de detalles
                  =============================================*/ 
   
                  JSON.parse($(".ps-product__variations").attr("specification")).forEach((detail, index)=>{
  
                      /*=============================================
                      Seleccionamos el nombre de propiedad de cada detalle
                      =============================================*/ 
                  
                      let property = Object.keys(detail).toString(); 
  
                      /*=============================================
                      Construimos el HTML que va a aparecer en la vista
                      =============================================*/ 
                 
                      let figure = `<figure class="details${index}">
                      
                                      <figcaption>${property}: <strong>Choose an option</strong></figcaption>
  
                                      <div class="d-flex">
                                      
                                      </div>
  
                                  </figure>`
  
                      /*=============================================
                      Pintamos en la vista el HTML de figure
                      =============================================*/ 
  
                      $(".ps-product__variations").append(`
                          
                          ${figure}
  
                      `)
  
                      for(const i in detail[property]){
  
                          if(property == "Color"){
  
                              $(`.details${index} .d-flex`).append(`
  
                                   <div
                                      class="rounded-circle mr-3 details ${property}"
                                      detailType="${property}"
                                      detailValue="${detail[property][i]}"
                                      data-toggle="tooltip" title="${detail[property][i]}"
                                      style="background-color:${detail[property][i]}; width:30px; height:30px; cursor:pointer; border:1px solid #bbb"></div>
  
                              `)
  
                          }else{
  
                              $(`.details${index} .d-flex`).append(`
  
                                  <div
                                      class="py-2 px-3 mr-3 details ${property}"
                                      detailType="${property}"
                                      detailValue="${detail[property][i]}"
                                      data-toggle="tooltip" title="${detail[property][i]}"
                                      style="cursor:pointer; border:1px solid #bbb">${detail[property][i]}</div>
                              `)
  
  
                          }
  
                      }
  
                 })
  
              }
  
              /*=============================================
              Agregamos detalles del producto al localstorage
              =============================================*/ 
  
              $(document).on("click", ".details", function(){
  
                  /*=============================================
                  Señalar el detalle escogido
                  =============================================*/ 
  
                  let details = $(`.details.${$(this).attr("detailType")}`);
  
                  for(let i = 0; i < details.length; i++){
  
                      $(details[i]).css({"border":"1px solid #bbb"})
  
                  }
  
                  $(this).css({"border":"3px solid #bbb"})
  
                  /*=============================================
                  Preguntar si existen detalles en el LocalStorage
                  =============================================*/ 
  
                  if(localStorage.getItem("details")){
  
                      let details = JSON.parse(localStorage.getItem("details"));
  
                      for(const i in details){
  
                          details[i][$(this).attr("detailType")] = $(this).attr("detailValue");
  
                          localStorage.setItem("details", JSON.stringify(details))
                      }
  
                  }else{
  
                      localStorage.setItem("details", `[{"${$(this).attr("detailType")}":"${$(this).attr("detailValue")}"}]`)
  
                  }
     
              })
  
      }
    
      }
      /*=============================================
    Función Callback Galería
    =============================================*/ 

callbackGallery(){

  if(this.renderGallery){

    this.renderGallery = false;

    SlickConfig.fnc()
    ProductLightbox.fnc()

  }

}


  /*=============================================
	Función para agregar productos a la lista de deseos	
	=============================================*/

	addWishlist(product){		  
		this.usersService.addWishlist(product);
  }
  
   /*=============================================
	Función para agregar productos al carrito de compras
	=============================================*/

	addShoppingCart(product, unit, details){

		let url = this.router.url;

		let item = {
		
			product: product,
			unit: unit,
			details: details,
			url:url
		}

		this.usersService.addSoppingCart(item);

	}

}
