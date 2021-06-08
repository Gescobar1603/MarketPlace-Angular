import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

declare var jQuery: any;
declare var $: any;

import { CategoriasService } from '../services/categorias.service';
import { SubCategoriasService } from '../services/sub-categorias.service';
import { ProductsService } from '../services/products.service';

import { OwlCarouselConfig, CarouselNavigation,SlickConfig, ProductLightbox, CountDown , Rating, ProgressBar} from '../funciones';

@Component({
	selector: 'app-home-showcase',
	templateUrl: '../pages/home-showcase.component.html',
	styleUrls: ['../styles/home-showcase.component.css']
})
export class HomeShowcaseComponent implements OnInit {

	path: string = Path.url;
	categories: any[] = [];
	cargando: boolean = false;
	render: boolean = true;

	constructor(private categoriesService: CategoriasService, private subCategoriesServices: SubCategoriasService, private productsServices: ProductsService) { }

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

				if(index < 4){

					this.categories[index] = getCategories[index];
					this.cargando = false;
				}

			})

		})
			
	}

	/*=============================================
	Funcion que avisa cuando el renderizado de angular termina
	=============================================*/	

	callback(indexes) {
		
		if (this.render) {

			this.render = false;
			let arraySubCategorias = [];
			let arrayProducts = [];
			let preloadSV = 0;

			/*=============================================
			Separamos las categorias
			=============================================*/
			
			this.categories.forEach(categoria=> {
						
			/*=============================================
			Tomamos la coleccion de las sub-categorias filtrando con los nombres de las categorias
			=============================================*/
				this.subCategoriesServices.getFilterDataSubCategoria("categoria", categoria.nombre)
					.subscribe(resp => {
					
						let i;
						for (i in resp) {
							
							arraySubCategorias.push({

								"categoria": resp[i].categoria,
								"nombre": resp[i].nombre,
								"url": resp[i].url
,							})
						}
						/*=============================================
						Recorremos el array de objetos nuevo para buscar conicidencias con los nombres de las categorias
						=============================================*/
				
						for (i in arraySubCategorias) {
							
							if (categoria.nombre == arraySubCategorias[i].categoria) {
									
								$(`[category-vitrina='${categoria.nombre}']`).append(
									`
									<li><a href="products/${arraySubCategorias[i].url}">${arraySubCategorias[i].nombre}</a></li>
									
									`
								)
							}
						}
				})

			/*=============================================
			Tomamos la coleccion de los prductos filtrando con las url de categoria
			=============================================*/
				
				this.productsServices.getFilterDataWithLimit("category",categoria.url, 6)
					.subscribe(resp => {
					
						let i;
						for (i in resp) {
							
							arrayProducts.push({

								"category": resp[i].category,
								"url": resp[i].url,
								"nombre": resp[i].nombre,
								"imagen": resp[i].imagen,
								"precio": resp[i].precio,
								"oferta": resp[i].oferta,
								"reviews": resp[i].reviews,
								"stock": resp[i].stock,
								"vertical_slider": resp[i].vertical_slider


							})

							console.log(arrayProducts)
						}
						/*=============================================
						Recorremos el array de objetos nuevo para buscar conicidencias con las url de categorias
						=============================================*/

						for (i in arrayProducts) {
							
							if (categoria.url == arrayProducts[i].category) {


						/*=============================================
						Definimos si el precio del producto tiene oferta o no
						=============================================*/
								let price = `<p class="ps-product__price sale">$567.99 <del>$670.00 </del></p>`;
								let tipo;
								let valor;
								let oferta;
								let disccount;
								let Offerdate;
								let today = new Date();
								disccount = "";

								if (arrayProducts[i].oferta != "") {

									Offerdate = new Date(

										parseInt(JSON.parse(arrayProducts[i].oferta)[2].split("-")[0]),
										parseInt(JSON.parse(arrayProducts[i].oferta)[2].split("-")[1]) - 1,
										parseInt(JSON.parse(arrayProducts[i].oferta)[2].split("-")[2])
									)
		

									if (today < Offerdate) {
									
										tipo = JSON.parse(arrayProducts[i].oferta)[0];
										valor = JSON.parse(arrayProducts[i].oferta)[1];

										if (tipo == "Descuento") {

											oferta = (arrayProducts[i].precio - (arrayProducts[i].precio * valor / 100)).toFixed(2)
		
										}
		
										if (tipo == "Fijo") {
		
											oferta = valor
											valor = Math.round(oferta * 100 / arrayProducts[i].precio);
										
										}

										disccount = `	<div class="ps-product__badge">-${valor}%</div>`

										price = `<p class="ps-product__price sale">$${oferta} <del>$${arrayProducts[i].precio} </del></p>`;
								
									} else {
										
										price =  `<p class="ps-product__price">$${arrayProducts[i].precio} </p>`;


									}

									} else {
									
									price =  `<p class="ps-product__price">$${arrayProducts[i].precio} </p>`;

								}

				        /*=============================================
				        Calculamos el total de las calificaciones de las reseñas
				        =============================================*/	
				  
				        let totalReview = 0;
				
								for (let f = 0; f < JSON.parse(arrayProducts[i].reviews).length; f++) {
				
									totalReview += Number(JSON.parse(arrayProducts[i].reviews)[f]["review"])
				          
								}
								
								/*=============================================
								Imprimimos el total de las calificaciones para cada producto
								=============================================*/	
				
								let rating = Math.round(totalReview / JSON.parse(arrayProducts[i].reviews).length);

							/*=============================================
							Definimos si el producto tiene stock
							=============================================*/	

									if(arrayProducts[i].stock == 0){
		
										disccount = `<div class="ps-product__badge out-stock">Out Of Stock</div>`;
		
									}
								/*=============================================
								Imprimimos los productos en el html
								=============================================*/


								$(`[category-pb='${arrayProducts[i].category}']`).append(
										
									`
									<div class="ps-product ps-product--simple">

									<div class="ps-product__thumbnail">

											<a href="product/${arrayProducts[i].url}">

													<img src="assets/img/products/${arrayProducts[i].category}/${arrayProducts[i].imagen}" alt="">

											</a>

												${disccount}

									</div>

									<div class="ps-product__container">

											<div class="ps-product__content" data-mh="clothing">

													<a class="ps-product__title" href="product/${arrayProducts[i].url}">${arrayProducts[i].nombre}...</a>

													<div class="ps-product__rating">

															<select class="ps-rating productRating" data-read-only="true">

														
																	</select>

															<span>${rating}</span>

													</div>

													${price}

											</div>

									</div>

							</div>
				

									`
								)
								
							/*=============================================
							Clasificamos la cantidad de estrellas según la calificación
							=============================================*/	

							let arrayRating = $(".productRating");

							for(let i = 0; i < arrayRating.length; i++){

								for(let f = 1; f <= 5; f++){
								
									$(arrayRating[i]).append(

										`<option value="2">${f}</option>`
									)

									if(rating == f){

										$(arrayRating[i]).children('option').val(1)

									}

								}
							
							}
								
							/*=============================================
							Ejecutar funciones globales con respecto a las Reseñas
							=============================================*/	

							Rating.fnc();

								/*=============================================
							Imprimimos los productos en el Vertical Slider
							=============================================*/	

							$(`[category-sl='${arrayProducts[i].category}']`).append(`

							<a href="product/${arrayProducts[i].url}">

												<img src="assets/img/products/${arrayProducts[i].category}/vertical/${arrayProducts[i].vertical_slider}" alt="">

											</a>

						`)

							/*=============================================
							Ejecutar funciones globales con respecto al carrusel
							=============================================*/	

							preloadSV++;


							if(preloadSV == 18){

								$(`[category-sl]`).addClass('ps-carousel--product-box')
								$(`[category-sl]`).addClass('owl-slider')

								$(`[category-sl]`).owlCarousel({

									 items: 1,
									 autoplay: true,
									 autoplayTimeout: 7000,
									 loop: true,
                        		     nav: true,
                        		     margin: 0,
                        		     dots: true,
                        		     navSpeed: 500,
                        		     dotsSpeed: 500,
                        		     dragEndSpeed: 500,
                        		     navText: ["<i class='icon-chevron-left'></i>", "<i class='icon-chevron-right'></i>"],

								});

							}

							}
						}
				})
			});
		}

	}
	
}
