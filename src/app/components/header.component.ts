import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { report } from 'node:process';
import { Path } from '../config';

import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-header',
  templateUrl: '../pages/header.component.html',
  styleUrls: ['../styles/header.component.css']
})
export class HeaderComponent implements OnInit {

  path: string = Path.url;
  categorias: object = null;
  subitulo: Array <any> = []

  constructor(private categoriasService: CategoriasService) { }

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

        for (i in resp)
          /*============================================================
          Separanmos la lista de subittulos en indices de un array
          =============================================================*/
          this.subitulo.push(JSON.parse(resp[i].tag));

    })

    }

}
