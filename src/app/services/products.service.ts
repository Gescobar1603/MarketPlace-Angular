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

  getDataBannerDefault() {

    return this.http.get(`${this.api}banner-promotion.json`)

  }

  getDataSlider() {

    return this.http.get(`${this.api}slider.json`)

  }

  getDataProduct() {

    return this.http.get(`${this.api}products.json`)

  }

  getLimitData(startAt: string, limitToFirst: number) {

    return this.http.get(`${this.api}slider.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);
    
  }

  getLimitData2(startAt: string, limitToFirst: number) {

    return this.http.get(`${this.api}banner-promotion.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);
    
  }

  getFilterData(orderBy:String, equalTo:String){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

	}

	getFilterDataWithLimit(orderBy:String, equalTo:String, limitToFirst:Number){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`);

	}

}
