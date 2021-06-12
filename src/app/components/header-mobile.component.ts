import { Component, OnInit } from '@angular/core';
import { Path } from '../config';
import { Search } from '../funciones';

declare var jQuery: any;
declare var $: any;

import { CategoriasService } from '../services/categorias.service';
import { SubCategoriasService } from '../services/sub-categorias.service';
import { UsersService } from '../services/users.service';

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
	picture:string;

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

  }

  	/*=============================================
	Declaramos función del buscador
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
}
