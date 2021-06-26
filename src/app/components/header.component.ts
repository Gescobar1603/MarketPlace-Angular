import { Component, OnInit } from '@angular/core';
import { Path } from '../config';
import { Search , DinamicPrice, Sweetalert} from '../funciones';

import { CategoriasService } from '../services/categorias.service';

import { SubCategoriasService } from '../services/sub-categorias.service';

import { ProductsService } from '../services/products.service';

import { UsersService } from '../services/users.service';

import { Router } from '@angular/router';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: '../pages/header.component.html',
  styleUrls: ['../styles/header.component.css']
})
export class HeaderComponent implements OnInit {

  path: string = Path.url;
  categorias: object = null;
  subitulosarray: Array<any> = [];
  renderizado: boolean = true;
  authValidate:boolean = false;
	picture:string;
  wishlist: number = 0;
  shoppingCart:any[] = [];
	totalShoppingCart:number = 0;
	renderShopping:boolean = true;
	subTotal:string = `<h3>Sub Total:<strong class="subTotalHeader"><div class="spinner-border"></div></strong></h3>`;

  constructor(private categoriasService: CategoriasService,
              private subCategoriasService: SubCategoriasService,
              private usersService: UsersService,
              private productsService: ProductsService,
              private router: Router) { }
          
  ngOnInit(): void {

    	/*=============================================
		Validar si existe usuario autenticado
		=============================================*/
		this.usersService.authActivate().then(resp =>{

			if(resp){

				this.authValidate = true;

				this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
				.subscribe(resp=>{

					for(const i in resp){

						/*=============================================
						Mostramos cantidad de productos en su lista de deseos
						=============================================*/

						if(resp[i].wishlist != undefined){

							this.wishlist = Number(JSON.parse(resp[i].wishlist).length)

						}

						/*=============================================
						Mostramos foto del usuario
						=============================================*/

						if(resp[i].picture != undefined){

							if(resp[i].method != "direct"){

								this.picture = `<img src="${resp[i].picture}" class="img-fluid rounded-circle ml-auto">`;
							
							}else{

								this.picture = `<img src="assets/img/users/${resp[i].username.toLowerCase()}/${resp[i].picture}" class="img-fluid rounded-circle ml-auto">`;
							}

						}else{

							this.picture = `<i class="icon-user"></i>`;
						}

					}

				})
			}

		})

    /*============================================================
    Tomamos la data de las categorias
    =============================================================*/

    this.categoriasService.getDataCategoria().subscribe(resp => {

        this.categorias = resp;

    /*===================================================================
    Recorremos la coleccion de categorias para tomar la lista de titulos
    =====================================================================*/
      
      let i;
      
      for (i in resp) {
          
          /*============================================================
          Separanmos la lista de subittulos en indices de un array
          =============================================================*/

        this.subitulosarray.push(JSON.parse(resp[i].tag));
        
      }
    })

		/*=============================================
		Tomamos la data del Carrito de Compras del LocalStorage
		=============================================*/

		if(localStorage.getItem("list")){

			let list = JSON.parse(localStorage.getItem("list"));

			this.totalShoppingCart = list.length;

			/*=============================================
			Recorremos el arreglo del listado
			=============================================*/
			
			for(const i in list){

				/*=============================================
				Filtramos los productos del carrito de compras
				=============================================*/

				this.productsService.getFilterData("url", list[i].product)
				.subscribe(resp=>{
					
					
					for(const f in resp){

						let details = `<div class="list-details small text-secondary">`

						if(list[i].details.length > 0){

							let specification = JSON.parse(list[i].details);	

							for(const i in specification){

								let property = Object.keys(specification[i]);

								for(const f in property){

									details += `<div>${property[f]}: ${specification[i][property[f]]}</div>`
								}

							}

						}else{

							/*=============================================
							Mostrar los detalles por defecto del producto 
							=============================================*/

							if(resp[f].specification != ""){

								let specification = JSON.parse(resp[f].specification);

								for(const i in specification){

									let property = Object.keys(specification[i]).toString();

									details += `<div>${property}: ${specification[i][property][0]}</div>`

								}

							}

						}

						details += `</div>`;

						this.shoppingCart.push({

							url:resp[f].url,
							name:resp[f].nombre,
							category:resp[f].category,
							image:resp[f].imagen,
							delivery_time:resp[f].delivery_time,
							quantity:list[i].unit,
							price: DinamicPrice.fnc(resp[f])[0],
							shipping:Number(resp[f].shipping)*Number(list[i].unit),
							details:details,
							listDetails:list[i].details

						})

					}

				})
			
			}

		}

  }

  	/*=============================================
	Declaramos función del buscador
	=============================================*/

	goSearch(search:string){

		if(search.length == 0 && Search.fnc(search) == undefined){

			return;
		}

		window.open(`search/${Search.fnc(search)}`, '_top')


	}

  /*============================================================
  Funcion que nos avisa cuando termina el renderizado de angular
  =============================================================*/

  callback() {

    if (this.renderizado) {

      this.renderizado = false;

      let arraySubcategorias = [];

      /*============================================================
      Hacemops un recorrrido por la lista de títulos
      =============================================================*/

      this.subitulosarray.forEach(tag => {

        /*============================================================
         Separar individualmente los titulos
        =============================================================*/

        for (let i = 0; i < tag.length; i++) {


            /*==========================================================================
             Tomamos la coleccion de las sub-categoriasfiltrando con la lista de titulos
            ===========================================================================*/

          this.subCategoriasService.getFilterDataSubCategoria("tag", tag[i]).subscribe(resp => {

            arraySubcategorias.push(resp);


              /*============================================================
                Hacemos un recorrido por la coleccion general de subcategorias
              =============================================================*/
          
            let f: string | number;
            
            let g: string | number;
            
            let arraytituloNombre = [];
            
            for (f in arraySubcategorias) {

              /*============================================================
                Hacemos un recorrido por la coleccion particular de subcategorias
              =============================================================*/

              for (g in arraySubcategorias[f]) {
                  
                /*============================================================
                Creamos un nuevo array de objetos clasificando cada subcategoria con la respectiva lista de titulo a la que pertenece
                =============================================================*/

                  arraytituloNombre.push({

                    "tag": arraySubcategorias[f][g].tag,

                    "subcategoria": arraySubcategorias[f][g].nombre,

                    "url": arraySubcategorias[f][g].nombre.replace(/\s+/g, '')

                  })
              }
            }

              /*================================================================================
              Recorremos el array de objetos para buscar coincidencias con las listas de titulos
              ==================================================================================*/

              for (f in arraytituloNombre) {

                if (tag[i] == arraytituloNombre[f].tag) {

                  /*============================================================
                  Imprimir el nombre de la subcategoria debajo de el listado correspondiente
                  =============================================================*/

                  $(`[tag='${tag[i]}']`).append(

                    `<li>
                        <a href="products/${arraytituloNombre[f].url}">${arraytituloNombre[f].subcategoria}</a>
                      <li>`

                  )

                }

              }

          })

        }

      });

    }

  }

  /*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callbackShopping(){

		if(this.renderShopping){

			this.renderShopping = false;

			/*=============================================
			Sumar valores para el precio total
			=============================================*/

			let totalProduct = $(".ps-product--cart-mobile");

			setTimeout(function(){

				let price = $(".pShoppingHeader .end-price")
				let quantity = $(".qShoppingHeader");
				let shipping = $(".sShoppingHeader");

				let totalPrice = 0;

				for(let i = 0; i < price.length; i++){
									
					/*=============================================
					Sumar precio con envío
					=============================================*/

					let shipping_price = Number($(price[i]).html()) + Number($(shipping[i]).html());
					
					totalPrice +=  Number($(quantity[i]).html() * shipping_price)
		
				}

				$(".subTotalHeader").html(`$${totalPrice.toFixed(2)}`)

			},totalProduct.length * 500)

		}

  }
  
  	/*=============================================
	Función para remover productos de la lista de carrito de compras
	=============================================*/

	removeProduct(product, details){
		
		console.log("product", product);

		if(localStorage.getItem("list")){

			let shoppingCart = JSON.parse(localStorage.getItem("list"));

			shoppingCart.forEach((list, index)=>{

				if(list.product == product && list.details == details.toString()){

					shoppingCart.splice(index, 1);
					
				}

			})

			 /*=============================================
    		Actualizamos en LocalStorage la lista del carrito de compras
    		=============================================*/

    		localStorage.setItem("list", JSON.stringify(shoppingCart));

    		Sweetalert.fnc("success", "product removed", this.router.url)

		}

	}


}
