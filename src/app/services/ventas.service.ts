import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private api:String = Api.url;

  constructor(private http: HttpClient) { }

  getDataVentas(){

    return this.http.get(`${this.api}ventas.json`);

  }

}
