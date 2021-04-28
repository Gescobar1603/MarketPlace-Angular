import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Api} from '../config';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private api:string = Api.url;

  constructor(private http: HttpClient) { }

  getDataBanner() {

    return this.http.get(`${this.api}banner.json`)

  }

}
