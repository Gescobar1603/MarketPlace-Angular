"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductRightComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var ProductRightComponent = /** @class */ (function () {
    function ProductRightComponent(activateRoute, productsService, usersService, router) {
        this.activateRoute = activateRoute;
        this.productsService = productsService;
        this.usersService = usersService;
        this.router = router;
        this.path = config_1.Path.url;
        this.products = [];
        this.rating = [];
        this.reviews = [];
        this.price = [];
        this.render = true;
        this.cargando = false;
    }
    ProductRightComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        this.productsService.getFilterData("url", this.activateRoute.snapshot.params["param"])
            .subscribe(function (resp) {
            for (var i in resp) {
                _this.productsService.getFilterData("store", resp[i].store)
                    .subscribe(function (resp) {
                    _this.productsFnc(resp);
                });
            }
        });
    };
    /*=============================================
    Declaramos función para mostrar los productos recomendados
    =============================================*/
    ProductRightComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.products = [];
        /*=============================================
        Hacemos un recorrido por la respuesta que nos traiga el filtrado
        =============================================*/
        var i;
        var getProduct = [];
        for (i in response) {
            getProduct.push(response[i]);
        }
        /*=============================================
      Ordenamos de mayor a menor ventas el arreglo de objetos
      =============================================*/
        getProduct.sort(function (a, b) {
            return (b.sales - a.sales);
        });
        /*=============================================
        Filtramos el producto
        =============================================*/
        getProduct.forEach(function (product, index) {
            if (index < 4) {
                _this.products.push(product);
                /*=============================================
                   Rating y Review
                   =============================================*/
                _this.rating.push(funciones_1.DinamicRating.fnc(_this.products[index]));
                _this.reviews.push(funciones_1.DinamicReviews.fnc(_this.rating[index]));
                /*=============================================
                Price
                =============================================*/
                _this.price.push(funciones_1.DinamicPrice.fnc(_this.products[index]));
                _this.cargando = false;
            }
        });
    };
    ProductRightComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            funciones_1.Rating.fnc();
        }
    };
    /*=============================================
      Función para agregar productos a la lista de deseos
      =============================================*/
    ProductRightComponent.prototype.addWishlist = function (product) {
        this.usersService.addWishlist(product);
    };
    /*=============================================
    Función para agregar productos al carrito de compras
    =============================================*/
    ProductRightComponent.prototype.addShoppingCart = function (product, unit, details) {
        var url = this.router.url;
        var item = {
            product: product,
            unit: unit,
            details: details,
            url: url
        };
        this.usersService.addSoppingCart(item);
    };
    ProductRightComponent = __decorate([
        core_1.Component({
            selector: 'app-product-right',
            templateUrl: '../pages/product-right.component.html',
            styleUrls: ['../styles/product-right.component.css']
        })
    ], ProductRightComponent);
    return ProductRightComponent;
}());
exports.ProductRightComponent = ProductRightComponent;
