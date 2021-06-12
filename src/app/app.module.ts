import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

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
import { HomeFeaturesComponent } from './components/home-features.component';
import { HomePromotionComponent } from './components/home-promotion.component';
import { HomeHotTodayComponent } from './components/home-hot-today.component';
import { HomeTopCategoriasComponent } from './components/home-top-categorias.component';
import { HomeShowcaseComponent } from './components/home-showcase.component';
import { ProductsBreadcrumComponent } from './components/products-breadcrum.component';
import { BestSalesItemsComponent } from './components/best-sales-items.component';
import { ProductsRecomendedComponent } from './components/products-recomended.component';
import { ProductsShowcaseComponent } from './components/products-showcase.component';
import { SearchBreadcrumComponent } from './components/search-breadcrum.component';
import { SearchComponent } from './components/search.component';
import { SearchShowcaseComponent } from './components/search-showcase.component';
import { CallToActionComponent } from './components/call-to-action.component';
import { ProductBreadcrumbComponent } from './components/product-breadcrumb.component';
import { ProductLeftComponent } from './components/product-left.component';
import { ProductRightComponent } from './components/product-right.component';
import { RelatedProductComponent } from './components/related-product.component';
import { SimilarBoughtComponent } from './components/similar-bought.component';
import { UrlrecurePipe } from './pipes/urlrecure.pipe';
import { BoughtTogetherComponent } from './components/bought-together.component';
import { VendorStoreComponent } from './components/vendor-store.component';
import { ReviewsComponent } from './components/reviews.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { AccountComponent } from './components/account.component';


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
    HomeBannerComponent,
    HomeFeaturesComponent,
    HomePromotionComponent,
    HomeHotTodayComponent,
    HomeTopCategoriasComponent,
    HomeShowcaseComponent,
    ProductsBreadcrumComponent,
    BestSalesItemsComponent,
    ProductsRecomendedComponent,
    ProductsShowcaseComponent,
    SearchBreadcrumComponent,
    SearchComponent,
    SearchShowcaseComponent,
    CallToActionComponent,
    ProductBreadcrumbComponent,
    ProductLeftComponent,
    ProductRightComponent,
    RelatedProductComponent,
    SimilarBoughtComponent,
    UrlrecurePipe,
    BoughtTogetherComponent,
    VendorStoreComponent,
    ReviewsComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
