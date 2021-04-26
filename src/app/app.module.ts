import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { HeaderPromotionComponent } from './components/header-promotion.component';
import { HeaderMobileComponent } from './components/header-mobile.component';
import { NewletterComponent } from './components/newletter.component';

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
