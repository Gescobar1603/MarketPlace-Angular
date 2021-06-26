"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BestSalesItemsComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var BestSalesItemsComponent = /** @class */ (function () {
    function BestSalesItemsComponent(productsService, activateRoute, usersService, router) {
        this.productsService = productsService;
        this.activateRoute = activateRoute;
        this.usersService = usersService;
        this.router = router;
        this.path = config_1.Path.url;
        this.bestSalesItem = [];
        this.render = true;
        this.rating = [];
        this.reviews = [];
        this.price = [];
        this.cargando = false;
    }
    BestSalesItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*=============================================
        Capturamos el parámetro URL
        =============================================*/
        var params = this.activateRoute.snapshot.params["param"].split("&")[0];
        /*=============================================
        Filtramos data de productos con categorías
        =============================================*/
        this.productsService.getFilterData("category", params)
            .subscribe(function (resp1) {
            if (Object.keys(resp1).length > 0) {
                _this.productsFnc(resp1);
            }
            else {
                /*=============================================
                Filtramos data de subategorías
                =============================================*/
                _this.productsService.getFilterData("sub_category", params)
                    .subscribe(function (resp2) {
                    _this.productsFnc(resp2);
                });
            }
        });
    };
    /*=============================================
      Declaramos función para mostrar las mejores ventas
      =============================================*/
    BestSalesItemsComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.bestSalesItem = [];
        /*=============================================
        Hacemos un recorrido por la respuesta que nos traiga el filtrado
        =============================================*/
        var i;
        var getSales = [];
        for (i in response) {
            getSales.push(response[i]);
        }
        /*=============================================
        Ordenamos de mayor a menor ventas el arreglo de objetos
        =============================================*/
        getSales.sort(function (a, b) {
            return (b.sales - a.sales);
        });
        /*=============================================
        Filtramos solo hasta 10 productos
        =============================================*/
        getSales.forEach(function (product, index) {
            if (index < 10) {
                _this.bestSalesItem.push(product);
                _this.rating.push(funciones_1.DinamicRating.fnc(_this.bestSalesItem[index]));
                _this.reviews.push(funciones_1.DinamicReviews.fnc(_this.rating[index]));
                _this.price.push(funciones_1.DinamicPrice.fnc(_this.bestSalesItem[index]));
                _this.cargando = false;
            }
        });
    };
    /*=============================================
    Función que nos avisa cuando finaliza el renderizado de Angular
    =============================================*/
    BestSalesItemsComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            funciones_1.OwlCarouselConfig.fnc();
            funciones_1.CarouselNavigation.fnc();
            funciones_1.Rating.fnc();
        }
    };
    /*=============================================
    Función para agregar productos a la lista de deseos
    =============================================*/
    BestSalesItemsComponent.prototype.addWishlist = function (product) {
        this.usersService.addWishlist(product);
    };
    /*=============================================
Función para agregar productos al carrito de compras
=============================================*/
    BestSalesItemsComponent.prototype.addShoppingCart = function (product, unit, details) {
        var url = this.router.url;
        var item = {
            product: product,
            unit: unit,
            details: details,
            url: url
        };
        this.usersService.addSoppingCart(item);
    };
    BestSalesItemsComponent = __decorate([
        core_1.Component({
            selector: 'app-best-sales-items',
            templateUrl: '../pages/best-sales-items.component.html',
            styleUrls: ['../styles/best-sales-items.component.css']
        })
    ], BestSalesItemsComponent);
    return BestSalesItemsComponent;
}());
exports.BestSalesItemsComponent = BestSalesItemsComponent;
