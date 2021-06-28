import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { ProductsService } from '../services/products.service';

import { UsersService } from '../services/users.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  templateUrl: '../pages/call-to-action.component.html',
  styleUrls: ['../styles/call-to-action.component.css']
})
export class CallToActionComponent implements OnInit {

  path:string = Path.url;	
  call_to_action:any[] = [];	
  price:any[] = [];	

  constructor(private activateRoute: ActivatedRoute,
              private productsService: ProductsService,
              private usersService: UsersService,
              private router: Router) { }
          
  ngOnInit(): void {

    this.productsService.getFilterData("url",  this.activateRoute.snapshot.params["param"])
    .subscribe( resp => { 			
      
      for(const i in resp){

        this.call_to_action.push(resp[i])


        this.call_to_action.forEach(response=>{
        
          let type;
            let value;
            let offer;
           
            if(response.offer != ""){

                type = JSON.parse(response.oferta)[0];
                value = JSON.parse(response.oferta)[1];

                if(type == "Descuento"){

                    offer = (response.precio-(response.precio * value/100)).toFixed(2)    
                }    

                if(type == "Fijo"){

                    offer = value;
                 
                }

                this.price.push(`<span class="ps-product__price">

                                <span>$${offer}</span>

                                <del>$${response.precio}</del>

                            </span>`);

            }else{

                this.price.push(`<span class="ps-product__price">

                                <span>$${response.precio}</span>

                            </span>`);
            }

          })
      
      }

    })
    
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
