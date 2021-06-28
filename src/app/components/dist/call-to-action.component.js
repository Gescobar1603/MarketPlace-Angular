"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CallToActionComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var CallToActionComponent = /** @class */ (function () {
    function CallToActionComponent(activateRoute, productsService, usersService, router) {
        this.activateRoute = activateRoute;
        this.productsService = productsService;
        this.usersService = usersService;
        this.router = router;
        this.path = config_1.Path.url;
        this.call_to_action = [];
        this.price = [];
    }
    CallToActionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productsService.getFilterData("url", this.activateRoute.snapshot.params["param"])
            .subscribe(function (resp) {
            for (var i in resp) {
                _this.call_to_action.push(resp[i]);
                _this.call_to_action.forEach(function (response) {
                    var type;
                    var value;
                    var offer;
                    if (response.offer != "") {
                        type = JSON.parse(response.oferta)[0];
                        value = JSON.parse(response.oferta)[1];
                        if (type == "Descuento") {
                            offer = (response.precio - (response.precio * value / 100)).toFixed(2);
                        }
                        if (type == "Fijo") {
                            offer = value;
                        }
                        _this.price.push("<span class=\"ps-product__price\">\n\n                                <span>$" + offer + "</span>\n\n                                <del>$" + response.precio + "</del>\n\n                            </span>");
                    }
                    else {
                        _this.price.push("<span class=\"ps-product__price\">\n\n                                <span>$" + response.precio + "</span>\n\n                            </span>");
                    }
                });
            }
        });
    };
    /*=============================================
Función para agregar productos al carrito de compras
=============================================*/
    CallToActionComponent.prototype.addShoppingCart = function (product, unit, details) {
        var url = this.router.url;
        var item = {
            product: product,
            unit: unit,
            details: details,
            url: url
        };
        this.usersService.addSoppingCart(item);
    };
    CallToActionComponent = __decorate([
        core_1.Component({
            selector: 'app-call-to-action',
            templateUrl: '../pages/call-to-action.component.html',
            styleUrls: ['../styles/call-to-action.component.css']
        })
    ], CallToActionComponent);
    return CallToActionComponent;
}());
exports.CallToActionComponent = CallToActionComponent;
