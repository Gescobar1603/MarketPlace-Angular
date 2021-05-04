import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { HeaderPromotionComponent } from './components/header-promotion.component';
import { HeaderMobileComponent } from './components/header-mobile.component';
import { NewletterComponent } from './components/newletter.component';
import { HomeComponent } from './components/home.component';
import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { BuscadorComponent } from './components/buscador.component';
import { Error404Component } from './components/error404.component';
import { HomeBannerComponent } from './components/home-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewletterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    BuscadorComponent,
    Error404Component,
    HomeBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
