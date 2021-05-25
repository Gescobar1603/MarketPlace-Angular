import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-home-top-categorias',
  templateUrl: '../pages/home-top-categorias.component.html',
  styleUrls: ['../styles/home-top-categorias.component.css']
})
export class HomeTopCategoriasComponent implements OnInit {


	path:string = Path.url;	
	categories:any[] = [];
	cargando:boolean = false;

	constructor(private categoriesService: CategoriasService) { }

	ngOnInit(): void {

		this.cargando = true;

		/*=============================================
		Tomamos la data de las categorias
		=============================================*/

		let getCategories = [];

		this.categoriesService.getDataCategoria()		
		.subscribe( resp => {
			
			let i;

			for(i in resp){

				getCategories.push(resp[i])

			}

			/*=============================================
			Ordenamos de mayor vistas a menor vistas el arreglo de objetos
			=============================================*/
			
			getCategories.sort(function(a,b){

				return(b.vistas - a.vistas)

			})

			/*=============================================
			Filtramos hasta 6 categorías
			=============================================*/	

			getCategories.forEach((category, index)=>{

				if(index < 3){

					this.categories[index] = getCategories[index];
					this.cargando = false;
				}

			})

		})
			
	}

}
