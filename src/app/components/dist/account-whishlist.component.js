"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountWhishlistComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var rxjs_1 = require("rxjs");
var notie_1 = require("notie");
var AccountWhishlistComponent = /** @class */ (function () {
    function AccountWhishlistComponent(usersService, productsService) {
        this.usersService = usersService;
        this.productsService = productsService;
        this.path = config_1.Path.url;
        this.wishlist = [];
        this.products = [];
        this.price = [];
        this.render = true;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.popoverMessage = 'Are you sure to remove it?';
    }
    AccountWhishlistComponent.prototype.ngOnInit = function () {
        /*=============================================
    Agregamos opciones a DataTable
    =============================================*/
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            processing: true
        };
        /*=============================================
        Seleccionamos el id del usuario
        =============================================*/
        this.usersService.getUniqueData(this.childItem)
            .subscribe(function (resp) {
            if (resp["wishlist"] != undefined) {
                /*=============================================
            Tomamos de la data la lista de deseos
            =============================================*/
                _this.wishlist = JSON.parse(resp["wishlist"]);
                var load_1 = 0;
                /*=============================================
                Realizamos un foreach en la lista de deseos
                =============================================*/
                if (_this.wishlist.length > 0) {
                    _this.wishlist.forEach(function (list) {
                        /*=============================================
                        Filtramos la data de productos
                        =============================================*/
                        _this.productsService.getFilterData("url", list)
                            .subscribe(function (resp) {
                            /*=============================================
                            recorremos la data de productos
                            =============================================*/
                            for (var i in resp) {
                                load_1++;
                                /*=============================================
                            agregamos los productos
                            =============================================*/
                                _this.products.push(resp[i]);
                                /*=============================================
                              validamos los precios en oferta
                            =============================================*/
                                _this.price.push(funciones_1.DinamicPrice.fnc(resp[i]));
                                /*=============================================
                              preguntamos cuando termina de cargar toda la data en el DOM
                              =============================================*/
                                if (load_1 == _this.wishlist.length) {
                                    _this.dtTrigger.next();
                                }
                            }
                        });
                    });
                }
            }
        });
    };
    /*=============================================
    Removemos el producto de la lista de deseos
    =============================================*/
    AccountWhishlistComponent.prototype.removeProduct = function (product) {
        /*=============================================
        Buscamos coincidencia para remover el producto
        =============================================*/
        var _this = this;
        this.wishlist.forEach(function (list, index) {
            if (list == product) {
                _this.wishlist.splice(index, 1);
            }
        });
        /*=============================================
        Actualizamos en Firebase la lista de deseos
        =============================================*/
        var body = {
            wishlist: JSON.stringify(this.wishlist)
        };
        this.usersService.patchData(this.childItem, body)
            .subscribe(function (resp) {
            if (resp["wishlist"] != "") {
                funciones_1.Sweetalert.fnc("success", "Product removed", "account");
            }
        });
    };
    /*=============================================
    Callback
    =============================================*/
    AccountWhishlistComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            if (window.matchMedia("(max-width:991px)").matches) {
                var localWishlist_1 = this.wishlist;
                var localUsersService_1 = this.usersService;
                var localChildItem_1 = this.childItem;
                $(document).on("click", ".removeProduct", function () {
                    var product = $(this).attr("remove");
                    notie_1["default"].confirm({
                        text: "Seguro que desear eliminar este producto?",
                        cancelCallback: function () {
                            return;
                        },
                        submitCallback: function () {
                            /*=============================================
                            Buscamos coincidencia para remover el producto
                            =============================================*/
                            localWishlist_1.forEach(function (list, index) {
                                if (list == product) {
                                    localWishlist_1.splice(index, 1);
                                }
                            });
                            /*=============================================
                            Actualizamos en Firebase la lista de deseos
                            =============================================*/
                            var body = {
                                wishlist: JSON.stringify(localWishlist_1)
                            };
                            localUsersService_1.patchData(localChildItem_1, body)
                                .subscribe(function (resp) {
                                if (resp["wishlist"] != "") {
                                    funciones_1.Sweetalert.fnc("success", "Product removed", "account");
                                }
                            });
                        }
                    });
                });
            }
        }
    };
    /*=============================================
    Destruímos el trigger de angular
    =============================================*/
    AccountWhishlistComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    __decorate([
        core_1.Input()
    ], AccountWhishlistComponent.prototype, "childItem");
    AccountWhishlistComponent = __decorate([
        core_1.Component({
            selector: 'app-account-whishlist',
            templateUrl: '../pages/account-whishlist.component.html',
            styleUrls: ['../styles/account-whishlist.component.css']
        })
    ], AccountWhishlistComponent);
    return AccountWhishlistComponent;
}());
exports.AccountWhishlistComponent = AccountWhishlistComponent;
