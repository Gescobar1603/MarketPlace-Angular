import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Api } from '../config';

import {ApiMockUp} from '../config'

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {

  private api: string = Api.url;
  private api2: string = ApiMockUp.url;

  constructor(private http: HttpClient) { }

  getDataCategoria() {

    return this.http.get(`${this.api}categorias.json`)
  }


}