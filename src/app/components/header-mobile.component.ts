import { Component, OnInit } from '@angular/core';
import { Path } from '../config';
import { Search , DinamicPrice, Sweetalert } from '../funciones';

declare var jQuery: any;
declare var $: any;

import { CategoriasService } from '../services/categorias.service';
import { SubCategoriasService } from '../services/sub-categorias.service';
import { UsersService } from '../services/users.service';
import { ProductsService} from '../services/products.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header-mobile',
  templateUrl: '../pages/header-mobile.component.html',
  styleUrls: ['../styles/header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  path: string = Path.url;
  categorias: object = null;
  renderizado: boolean = true;
  listaCategorias: any[] = [];
  authValidate:boolean = false;
  picture: string;
  shoppingCart:any[] = [];
	totalShoppingCart:number = 0;
	renderShopping:boolean = true;
	subTotal:string = `<h3>Sub Total:<strong class="subTotalHeader"><div class="spinner-border"></div></strong></h3>`;


  constructor(private categoriasService: CategoriasService, private subCategoriasService: SubCategoriasService,private usersService: UsersService, private router: Router, private productsService: ProductsService) { }

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

    this.categoriasService.getDataCategoria()
      .subscribe(resp => {

        this.categorias = resp;

      /*============================================================
      Recorrido por el objeto de la data de categorias
      =============================================================*/
        let i;

        for (i in resp) {

          /*============================================================
           Separamos los nombres de las categorias
          =============================================================*/

          this.listaCategorias.push(resp[i].nombre)
        }

      })
     
    /*============================================================
    Activamos el efecto toogle en el listado de subactegorias 
    ( para que no se trabe el troogle a la hora de llamar los datos dianmicos)
    =============================================================*/
    
    $(document).on("click", ".sub-toggle",function() {
      
      $(this).parent().children('ul').toggle()
      
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
	Declaramos funci??n del buscador
	=============================================*/

	goSearch(search:string){

		if(search.length == 0 || Search.fnc(search) == undefined){

			return;
		}

		window.open(`search/${Search.fnc(search)}`, '_top')

	}
    
  /*============================================================
    Activamos el efecto toogle en el listado de subactegorias
  =============================================================*/
  callback() {
      
    if (this.renderizado) {
      
      this.renderizado = false;
      let subcategoriasArray = [];

      /*============================================================
        Separa la coleccion de las subcategorias filtrando con los nombres decategoria
      =============================================================*/

      this.listaCategorias.forEach(categoria => {

        /*============================================================
          Tomamos la coleccion de las subcategorias filtrando con los nombres
          de categoria
        =============================================================*/
        
        this.subCategoriasService.getFilterDataSubCategoria("categoria", categoria)
          .subscribe(resp => {
            
          /*============================================================
            Hacemos un recorrido por la coleccion general de subcategorias y clasificamos las subcategorias y url
            deacuerdo a la categoria que corresponda
          =============================================================*/
            let i= null;

            for (i in resp) {
              
              subcategoriasArray.push({
                
                "categoria": resp[i].categoria,
                "subcategoria": resp[i].nombre,
                "url":resp[i].nombre.replace(/\s+/g, '')
              })
            }
          /*============================================================
            Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorias
          =============================================================*/
            
            for (i in subcategoriasArray) {
              
              if (categoria == subcategoriasArray[i].categoria) {
                
                $(`[categoria='${categoria}']`).append(
                    
                  `<li class="current-menu-item ">
                      <a href="products/${subcategoriasArray[i].subcategoria}">${subcategoriasArray[i].subcategoria}</a>
                  </li>`
                
                )

              }

            }


        })

      })
  
    }

  }

	/*=============================================
	Funci??n que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callbackShopping(){

		if(this.renderShopping){

			this.renderShopping = false;

			/*=============================================
			Sumar valores para el precio total
			=============================================*/

			let totalProduct = $(".ps-product--cart-mobile");

			setTimeout(function(){

				let price = $(".pShoppingHeaderM .end-price")
				let quantity = $(".qShoppingHeaderM");
				let shipping = $(".sShoppingHeaderM");

				let totalPrice = 0;

				for(let i = 0; i < price.length; i++){

					/*=============================================
					Sumar precio con env??o
					=============================================*/

					let shipping_price = Number($(price[i]).html()) + Number($(shipping[i]).html());
					
					totalPrice +=  Number($(quantity[i]).html() * shipping_price)
		
				}

				$(".subTotalHeader").html(`$${totalPrice.toFixed(2)}`)

			},totalProduct.length * 500)

		}

	}

	/*=============================================
	Funci??n para remover productos de la lista de carrito de compras
	=============================================*/

	removeProduct(product, details){
		
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
