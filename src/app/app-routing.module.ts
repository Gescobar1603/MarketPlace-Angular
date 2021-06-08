import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { BuscadorComponent } from './components/buscador.component';
import { Error404Component } from './components/error404.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:param', component: ProductsComponent},
  {path: 'product/:param', component:ProductComponent},
  { path: 'search/:param', component: BuscadorComponent },
  { path: 'login', component: LoginComponent },
  {path: 'register', component:RegisterComponent},
  {path: '**', pathMatch:'full', component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
