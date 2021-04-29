import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Api } from '../config';


@Injectable({
  providedIn: 'root'
})
export class SubCategoriasService {

  private api: string = Api.url;

  constructor(private http: HttpClient) { }

  getFilterDataSubCategoria(orderBy, equalTo) {

    return this.http.get(`${this.api}sub-categorias.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
  }
}
