import { Component, OnInit , Input} from '@angular/core';
import { Path } from '../config';

import { StoresService } from '../services/stores.service';

@Component({
  selector: 'app-vendor-store',
  templateUrl: '../pages/vendor-store.component.html',
  styleUrls: ['../styles/vendor-store.component.css']
})
export class VendorStoreComponent implements OnInit {


	@Input() childItem:any;
	path:String = Path.url;
	store:Array<any>= [];

  	constructor(private storesService: StoresService) { }

  	ngOnInit(): void {

  		this.storesService.getFilterData("store", this.childItem)
        .subscribe(resp => {
        
          console.log("store",resp);
  			
  			for(const i in resp){

  				this.store.push(resp[i])
  			
  			}

  		})
  	}

}

