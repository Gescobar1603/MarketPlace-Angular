import { Component, OnInit } from '@angular/core';
import { Path } from '../config';

import { CategoriasService } from '../services/categorias.service';
import { SubCategoriasService } from '../services/sub-categorias.service';

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

  constructor(private categoriasService: CategoriasService, private subCategoriasService: SubCategoriasService) { }

  ngOnInit(): void {

    /*============================================================
    Tomamos la data de las categorias
    =============================================================*/

    this.categoriasService.getDataCategoria()
      .subscribe(resp => {

        this.categorias = resp;

    /*============================================================
    Recorremos la coleccion de categorias para tomar la lista de titulos
    =============================================================*/
        let i;

        for (i in resp) {
          /*============================================================
          Separanmos la lista de subittulos en indices de un array
          =============================================================*/
          this.subitulosarray.push(JSON.parse(resp[i].tag));
        }

    })

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

          this.subCategoriasService.getFilterDataSubCategoria("tag", tag[i])
            .subscribe(resp => {

              arraySubcategorias.push(resp);

              /*============================================================
               Hacemos un recorrido por la coleccion general de subcategorias
              =============================================================*/

              let f;
              let g;
              let  arraytituloNombre= [];
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
                    "subcategoria": arraySubcategorias[f][g].nombre

                  })

                }

              }

              /*============================================================
              Recorremos el array de objetos para buscar coincidencias con las listas de titulos
              =============================================================*/

              for (f in arraytituloNombre) {

                if (tag[i] == arraytituloNombre[f].tag) {

                  /*============================================================
                  Imprimir el nombre de la subcategoria debajo de el listado correspondiente
                  =============================================================*/

                  $(`[tag='${tag[i]}']`).append(

                    `<li>
                        <a href="">${arraytituloNombre[f].subcategoria}</a>
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
