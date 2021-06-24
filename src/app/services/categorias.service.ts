import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {

  private api: string = Api.url;


  constructor(private http: HttpClient) { }

  getDataCategoria() {

    return this.http.get(`${this.api}categorias.json`)

  }

  getFilterDataCategoria(orderBy, equalTo) {

    return this.http.get(`${this.api}categorias.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
  }

  patchDataCategoria(id: string, value: Object) {

    return this.http.patch(`${this.api}categorias/${id}.json`, value)
  }


}
