"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/header.component");
var footer_component_1 = require("./components/footer.component");
var header_promotion_component_1 = require("./components/header-promotion.component");
var header_mobile_component_1 = require("./components/header-mobile.component");
var newletter_component_1 = require("./components/newletter.component");
var home_component_1 = require("./components/home.component");
var products_component_1 = require("./components/products.component");
var product_component_1 = require("./components/product.component");
var buscador_component_1 = require("./components/buscador.component");
var error404_component_1 = require("./components/error404.component");
var home_banner_component_1 = require("./components/home-banner.component");
var home_features_component_1 = require("./components/home-features.component");
var home_promotion_component_1 = require("./components/home-promotion.component");
var home_hot_today_component_1 = require("./components/home-hot-today.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                header_promotion_component_1.HeaderPromotionComponent,
                header_mobile_component_1.HeaderMobileComponent,
                newletter_component_1.NewletterComponent,
                home_component_1.HomeComponent,
                products_component_1.ProductsComponent,
                product_component_1.ProductComponent,
                buscador_component_1.BuscadorComponent,
                error404_component_1.Error404Component,
                home_banner_component_1.HomeBannerComponent,
                home_features_component_1.HomeFeaturesComponent,
                home_promotion_component_1.HomePromotionComponent,
                home_hot_today_component_1.HomeHotTodayComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
