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
var forms_1 = require("@angular/forms");
var angular_datatables_1 = require("angular-datatables");
var angular_confirmation_popover_1 = require("angular-confirmation-popover");
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
var home_top_categorias_component_1 = require("./components/home-top-categorias.component");
var home_showcase_component_1 = require("./components/home-showcase.component");
var products_breadcrum_component_1 = require("./components/products-breadcrum.component");
var best_sales_items_component_1 = require("./components/best-sales-items.component");
var products_recomended_component_1 = require("./components/products-recomended.component");
var products_showcase_component_1 = require("./components/products-showcase.component");
var search_breadcrum_component_1 = require("./components/search-breadcrum.component");
var search_component_1 = require("./components/search.component");
var search_showcase_component_1 = require("./components/search-showcase.component");
var call_to_action_component_1 = require("./components/call-to-action.component");
var product_breadcrumb_component_1 = require("./components/product-breadcrumb.component");
var product_left_component_1 = require("./components/product-left.component");
var product_right_component_1 = require("./components/product-right.component");
var related_product_component_1 = require("./components/related-product.component");
var similar_bought_component_1 = require("./components/similar-bought.component");
var urlrecure_pipe_1 = require("./pipes/urlrecure.pipe");
var bought_together_component_1 = require("./components/bought-together.component");
var vendor_store_component_1 = require("./components/vendor-store.component");
var reviews_component_1 = require("./components/reviews.component");
var login_component_1 = require("./components/login.component");
var register_component_1 = require("./components/register.component");
var account_component_1 = require("./components/account.component");
var account_breadcrumb_component_1 = require("./components/account-breadcrumb.component");
var account_profile_component_1 = require("./components/account-profile.component");
var account_whishlist_component_1 = require("./components/account-whishlist.component");
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
                home_hot_today_component_1.HomeHotTodayComponent,
                home_top_categorias_component_1.HomeTopCategoriasComponent,
                home_showcase_component_1.HomeShowcaseComponent,
                products_breadcrum_component_1.ProductsBreadcrumComponent,
                best_sales_items_component_1.BestSalesItemsComponent,
                products_recomended_component_1.ProductsRecomendedComponent,
                products_showcase_component_1.ProductsShowcaseComponent,
                search_breadcrum_component_1.SearchBreadcrumComponent,
                search_component_1.SearchComponent,
                search_showcase_component_1.SearchShowcaseComponent,
                call_to_action_component_1.CallToActionComponent,
                product_breadcrumb_component_1.ProductBreadcrumbComponent,
                product_left_component_1.ProductLeftComponent,
                product_right_component_1.ProductRightComponent,
                related_product_component_1.RelatedProductComponent,
                similar_bought_component_1.SimilarBoughtComponent,
                urlrecure_pipe_1.UrlrecurePipe,
                bought_together_component_1.BoughtTogetherComponent,
                vendor_store_component_1.VendorStoreComponent,
                reviews_component_1.ReviewsComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                account_component_1.AccountComponent,
                account_breadcrumb_component_1.AccountBreadcrumbComponent,
                account_profile_component_1.AccountProfileComponent,
                account_whishlist_component_1.AccountWhishlistComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                angular_datatables_1.DataTablesModule,
                angular_confirmation_popover_1.ConfirmationPopoverModule.forRoot({
                    confirmButtonType: 'danger'
                })
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
