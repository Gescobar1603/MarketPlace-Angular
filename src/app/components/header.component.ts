import { Component, OnInit } from '@angular/core';
import { Path } from '../config';
import { Search } from '../funciones';

import { CategoriasService } from '../services/categorias.service';

import { SubCategoriasService } from '../services/sub-categorias.service';

import { UsersService } from '../services/users.service';

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
	wishlist:number = 0;

  constructor(private categoriasService: CategoriasService, private subCategoriasService: SubCategoriasService,private usersService: UsersService) { }

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

}
