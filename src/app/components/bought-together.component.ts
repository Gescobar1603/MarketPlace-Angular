import { Component, OnInit, Input }  from '@angular/core';
import { Path } from '../config';
import { DinamicPrice  } from '../funciones';

import { ProductsService } from '../services/products.service';

import {UsersService} from '../services/users.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-bought-together',
  templateUrl: '../pages/bought-together.component.html',
  styleUrls: ['../styles/bought-together.component.css']
})
export class BoughtTogetherComponent implements OnInit {

@Input() childItem:any;

	path:string = Path.url;	
	products:any[] = [];
	price:any[] = [];
	render:boolean = true;

  	constructor(private productsService: ProductsService, private usersService: UsersService) { }

  	ngOnInit(): void {

  		this.productsService.getFilterData("title_list", this.childItem["title_list"])	
  		.subscribe( resp => {
  			
  			this.productsFnc(resp);

  		})	

  	}

	/*=============================================
	Declaramos función para mostrar los productos recomendados
	=============================================*/	

  	productsFnc(response){

  		this.products.push(this.childItem);

  		 /*=============================================
	    Hacemos un recorrido por la respuesta que nos traiga el filtrado
	    =============================================*/ 

	    let i;
	    let getProduct = [];

	    for(i in response){

	      getProduct.push(response[i]);           
	        
	    }

	    /*=============================================
		Ordenamos de mayor a menor vistas el arreglo de objetos
		=============================================*/	

		getProduct.sort(function(a,b){
			return (b.views - a.views)
		})	

		/*=============================================
	    Filtramos solo 1 producto
	    =============================================*/

	    let random = Math.floor(Math.random()*getProduct.length); 

	    getProduct.forEach((product, index)=>{

	    	let noIndex = 0;

	    	if(this.childItem["nombre"] == product["nombre"]){

	    		noIndex = index;

	    	}

	    	if(random == noIndex){

	    		random = Math.floor(Math.random()*getProduct.length); 

	    	}
	    	    	
	    	if(index != noIndex && index == random){

	    		this.products.push(product);

	    	}

	    })

	    for(const i in this.products){

	    	/*=============================================
	        Price
	        =============================================*/        
	        this.price.push(DinamicPrice.fnc(this.products[i]));
	    	
	    }

  	}


  	callback(){


  		if(this.render){

  			this.render = false;

				let price = $(".endPrice .end-price");

  			let total = 0;

  			for(let i = 0; i < price.length; i++){  				

  				total += Number($(price[i]).html())		
  				
				}

  			$(".ps-block__total strong").html(`$${total.toFixed(2)}`)
  		}
		}
	
		/*=============================================
  	Agregar dos productos a la lista de deseos
    =============================================*/  

  	addWishlist(product1, product2){
 
  		this.usersService.addWishlist(product1);

  		let localUsersService = this.usersService;

  		setTimeout(function(){

  			localUsersService.addWishlist(product2);

  		},1000)

  	}
}
