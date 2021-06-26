"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BoughtTogetherComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var BoughtTogetherComponent = /** @class */ (function () {
    function BoughtTogetherComponent(productsService, usersService) {
        this.productsService = productsService;
        this.usersService = usersService;
        this.path = config_1.Path.url;
        this.products = [];
        this.price = [];
        this.render = true;
    }
    BoughtTogetherComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productsService.getFilterData("title_list", this.childItem["title_list"])
            .subscribe(function (resp) {
            _this.productsFnc(resp);
        });
    };
    /*=============================================
    Declaramos función para mostrar los productos recomendados
    =============================================*/
    BoughtTogetherComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.products.push(this.childItem);
        /*=============================================
       Hacemos un recorrido por la respuesta que nos traiga el filtrado
       =============================================*/
        var i;
        var getProduct = [];
        for (i in response) {
            getProduct.push(response[i]);
        }
        /*=============================================
        Ordenamos de mayor a menor vistas el arreglo de objetos
        =============================================*/
        getProduct.sort(function (a, b) {
            return (b.views - a.views);
        });
        /*=============================================
        Filtramos solo 1 producto
        =============================================*/
        var random = Math.floor(Math.random() * getProduct.length);
        getProduct.forEach(function (product, index) {
            var noIndex = 0;
            if (_this.childItem["nombre"] == product["nombre"]) {
                noIndex = index;
            }
            if (random == noIndex) {
                random = Math.floor(Math.random() * getProduct.length);
            }
            if (index != noIndex && index == random) {
                _this.products.push(product);
            }
        });
        for (var i_1 in this.products) {
            /*=============================================
            Price
            =============================================*/
            this.price.push(funciones_1.DinamicPrice.fnc(this.products[i_1]));
        }
    };
    BoughtTogetherComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            var price = $(".endPrice .end-price");
            var total = 0;
            for (var i = 0; i < price.length; i++) {
                total += Number($(price[i]).html());
            }
            $(".ps-block__total strong").html("$" + total.toFixed(2));
        }
    };
    /*=============================================
Agregar dos productos a la lista de deseos
=============================================*/
    BoughtTogetherComponent.prototype.addWishlist = function (product1, product2) {
        this.usersService.addWishlist(product1);
        var localUsersService = this.usersService;
        setTimeout(function () {
            localUsersService.addWishlist(product2);
        }, 1000);
    };
    __decorate([
        core_1.Input()
    ], BoughtTogetherComponent.prototype, "childItem");
    BoughtTogetherComponent = __decorate([
        core_1.Component({
            selector: 'app-bought-together',
            templateUrl: '../pages/bought-together.component.html',
            styleUrls: ['../styles/bought-together.component.css']
        })
    ], BoughtTogetherComponent);
    return BoughtTogetherComponent;
}());
exports.BoughtTogetherComponent = BoughtTogetherComponent;
