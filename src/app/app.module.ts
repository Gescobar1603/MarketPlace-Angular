import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewletterComponent } from './modules/newletter/newletter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewletterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
