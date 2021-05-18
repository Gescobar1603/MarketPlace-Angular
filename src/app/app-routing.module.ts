import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { BuscadorComponent } from './components/buscador.component';
import { Error404Component } from './components/error404.component';




const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'productos', component: ProductsComponent},
  {path: 'producto', component:ProductComponent},
  {path: 'buscador', component:BuscadorComponent},
  {path: '**', pathMatch:'full', component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
