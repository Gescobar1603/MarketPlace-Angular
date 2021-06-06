import { Component, OnInit } from '@angular/core';

import { CategoriasService } from '../services/categorias.service';
import { SubCategoriasService } from '../services/sub-categorias.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-breadcrum',
  templateUrl: '../pages/products-breadcrum.component.html',
  styleUrls: ['../styles/products-breadcrum.component.css']
})
export class ProductsBreadcrumComponent implements OnInit {

  breadcrum: string = null;

  constructor(private categoriesService: CategoriasService,
    private subCategoriesServices: SubCategoriasService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    /*============================================================
     Refrescamos el routerlink para actualizar la ruta de la página
    =============================================================*/

    let params = this.activatedRoute.snapshot.params["param"];

    /*============================================================
    Filtramos la data de Categorias
   =============================================================*/

    this.categoriesService.getFilterDataCategoria("url", params)
      .subscribe(resp1 => {

        if (Object.keys(resp1).length > 0) {
      
          let i;

          for (i in resp1) {

            this.breadcrum = resp1[i].nombre;

            let id = Object.keys(resp1).toString();

            console.log("id", id);

            let value = {
              
              "vistas": Number(resp1[i].vistas+1)
            }

            console.log("value", value);

            this.categoriesService.patchDataCategoria(id, value)
              .subscribe(resp3 => {
                
                console.log("resp3", resp3);
              })
          
          }

        } else {

          /*============================================================
            Filtramos la data de Sub-Categorias
           =============================================================*/
          
          this.subCategoriesServices.getFilterDataSubCategoria("url", params)
            .subscribe(resp2 => {
    
                let f;
     
                for (f in resp2) {
     
                  this.breadcrum = resp2[f].nombre;

                  let id = Object.keys(resp2).toString();

                  console.log("id", id);

                  let value = {
                    
                    "vistas": Number(resp2[f].vistas+1)
                  }

                  console.log("value", value);


                  this.subCategoriesServices.patchDataSubCategoria(id, value)
                    .subscribe(resp => {
                    
                      console.log("resp", resp);
                  })
              }
          })

        }

    })
    
  }

}