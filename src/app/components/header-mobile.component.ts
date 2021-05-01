import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

declare var jQuery: any;
declare var $: any;

import { CategoriasService } from '../services/categorias.service';
import { SubCategoriasService } from '../services/sub-categorias.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: '../pages/header-mobile.component.html',
  styleUrls: ['../styles/header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  path: string = Path.url;
  categorias: object = null;
  renderizado: boolean = true;
  listaCategorias:Array<any> = []

  constructor(private categoriasService: CategoriasService, private subCategoriasService: SubCategoriasService) { }

  ngOnInit(): void {

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
