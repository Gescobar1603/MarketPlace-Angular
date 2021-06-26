"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(categoriasService, subCategoriasService, usersService, productsService, router) {
        this.categoriasService = categoriasService;
        this.subCategoriasService = subCategoriasService;
        this.usersService = usersService;
        this.productsService = productsService;
        this.router = router;
        this.path = config_1.Path.url;
        this.categorias = null;
        this.subitulosarray = [];
        this.renderizado = true;
        this.authValidate = false;
        this.wishlist = 0;
        this.shoppingCart = [];
        this.totalShoppingCart = 0;
        this.renderShopping = true;
        this.subTotal = "<h3>Sub Total:<strong class=\"subTotalHeader\"><div class=\"spinner-border\"></div></strong></h3>";
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*=============================================
        Validar si existe usuario autenticado
        =============================================*/
        this.usersService.authActivate().then(function (resp) {
            if (resp) {
                _this.authValidate = true;
                _this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
                    .subscribe(function (resp) {
                    for (var i in resp) {
                        /*=============================================
                        Mostramos cantidad de productos en su lista de deseos
                        =============================================*/
                        if (resp[i].wishlist != undefined) {
                            _this.wishlist = Number(JSON.parse(resp[i].wishlist).length);
                        }
                        /*=============================================
                        Mostramos foto del usuario
                        =============================================*/
                        if (resp[i].picture != undefined) {
                            if (resp[i].method != "direct") {
                                _this.picture = "<img src=\"" + resp[i].picture + "\" class=\"img-fluid rounded-circle ml-auto\">";
                            }
                            else {
                                _this.picture = "<img src=\"assets/img/users/" + resp[i].username.toLowerCase() + "/" + resp[i].picture + "\" class=\"img-fluid rounded-circle ml-auto\">";
                            }
                        }
                        else {
                            _this.picture = "<i class=\"icon-user\"></i>";
                        }
                    }
                });
            }
        });
        /*============================================================
        Tomamos la data de las categorias
        =============================================================*/
        this.categoriasService.getDataCategoria().subscribe(function (resp) {
            _this.categorias = resp;
            /*===================================================================
            Recorremos la coleccion de categorias para tomar la lista de titulos
            =====================================================================*/
            var i;
            for (i in resp) {
                /*============================================================
                Separanmos la lista de subittulos en indices de un array
                =============================================================*/
                _this.subitulosarray.push(JSON.parse(resp[i].tag));
            }
        });
        /*=============================================
        Tomamos la data del Carrito de Compras del LocalStorage
        =============================================*/
        if (localStorage.getItem("list")) {
            var list_1 = JSON.parse(localStorage.getItem("list"));
            this.totalShoppingCart = list_1.length;
            var _loop_1 = function (i) {
                /*=============================================
                Filtramos los productos del carrito de compras
                =============================================*/
                this_1.productsService.getFilterData("url", list_1[i].product)
                    .subscribe(function (resp) {
                    for (var f in resp) {
                        var details = "<div class=\"list-details small text-secondary\">";
                        if (list_1[i].details.length > 0) {
                            var specification = JSON.parse(list_1[i].details);
                            for (var i_1 in specification) {
                                var property = Object.keys(specification[i_1]);
                                for (var f_1 in property) {
                                    details += "<div>" + property[f_1] + ": " + specification[i_1][property[f_1]] + "</div>";
                                }
                            }
                        }
                        else {
                            /*=============================================
                            Mostrar los detalles por defecto del producto
                            =============================================*/
                            if (resp[f].specification != "") {
                                var specification = JSON.parse(resp[f].specification);
                                for (var i_2 in specification) {
                                    var property = Object.keys(specification[i_2]).toString();
                                    details += "<div>" + property + ": " + specification[i_2][property][0] + "</div>";
                                }
                            }
                        }
                        details += "</div>";
                        _this.shoppingCart.push({
                            url: resp[f].url,
                            name: resp[f].nombre,
                            category: resp[f].category,
                            image: resp[f].imagen,
                            delivery_time: resp[f].delivery_time,
                            quantity: list_1[i].unit,
                            price: funciones_1.DinamicPrice.fnc(resp[f])[0],
                            shipping: Number(resp[f].shipping) * Number(list_1[i].unit),
                            details: details,
                            listDetails: list_1[i].details
                        });
                    }
                });
            };
            var this_1 = this;
            /*=============================================
            Recorremos el arreglo del listado
            =============================================*/
            for (var i in list_1) {
                _loop_1(i);
            }
        }
    };
    /*=============================================
    Declaramos función del buscador
    =============================================*/
    HeaderComponent.prototype.goSearch = function (search) {
        if (search.length == 0 && funciones_1.Search.fnc(search) == undefined) {
            return;
        }
        window.open("search/" + funciones_1.Search.fnc(search), '_top');
    };
    /*============================================================
    Funcion que nos avisa cuando termina el renderizado de angular
    =============================================================*/
    HeaderComponent.prototype.callback = function () {
        var _this = this;
        if (this.renderizado) {
            this.renderizado = false;
            var arraySubcategorias_1 = [];
            /*============================================================
            Hacemops un recorrrido por la lista de títulos
            =============================================================*/
            this.subitulosarray.forEach(function (tag) {
                /*============================================================
                 Separar individualmente los titulos
                =============================================================*/
                var _loop_2 = function (i) {
                    /*==========================================================================
                     Tomamos la coleccion de las sub-categoriasfiltrando con la lista de titulos
                    ===========================================================================*/
                    _this.subCategoriasService.getFilterDataSubCategoria("tag", tag[i]).subscribe(function (resp) {
                        arraySubcategorias_1.push(resp);
                        /*============================================================
                          Hacemos un recorrido por la coleccion general de subcategorias
                        =============================================================*/
                        var f;
                        var g;
                        var arraytituloNombre = [];
                        for (f in arraySubcategorias_1) {
                            /*============================================================
                              Hacemos un recorrido por la coleccion particular de subcategorias
                            =============================================================*/
                            for (g in arraySubcategorias_1[f]) {
                                /*============================================================
                                Creamos un nuevo array de objetos clasificando cada subcategoria con la respectiva lista de titulo a la que pertenece
                                =============================================================*/
                                arraytituloNombre.push({
                                    "tag": arraySubcategorias_1[f][g].tag,
                                    "subcategoria": arraySubcategorias_1[f][g].nombre,
                                    "url": arraySubcategorias_1[f][g].nombre.replace(/\s+/g, '')
                                });
                            }
                        }
                        /*================================================================================
                        Recorremos el array de objetos para buscar coincidencias con las listas de titulos
                        ==================================================================================*/
                        for (f in arraytituloNombre) {
                            if (tag[i] == arraytituloNombre[f].tag) {
                                /*============================================================
                                Imprimir el nombre de la subcategoria debajo de el listado correspondiente
                                =============================================================*/
                                $("[tag='" + tag[i] + "']").append("<li>\n                        <a href=\"products/" + arraytituloNombre[f].url + "\">" + arraytituloNombre[f].subcategoria + "</a>\n                      <li>");
                            }
                        }
                    });
                };
                for (var i = 0; i < tag.length; i++) {
                    _loop_2(i);
                }
            });
        }
    };
    /*=============================================
      Función que nos avisa cuando finaliza el renderizado de Angular
      =============================================*/
    HeaderComponent.prototype.callbackShopping = function () {
        if (this.renderShopping) {
            this.renderShopping = false;
            /*=============================================
            Sumar valores para el precio total
            =============================================*/
            var totalProduct = $(".ps-product--cart-mobile");
            setTimeout(function () {
                var price = $(".pShoppingHeader .end-price");
                var quantity = $(".qShoppingHeader");
                var shipping = $(".sShoppingHeader");
                var totalPrice = 0;
                for (var i = 0; i < price.length; i++) {
                    /*=============================================
                    Sumar precio con envío
                    =============================================*/
                    var shipping_price = Number($(price[i]).html()) + Number($(shipping[i]).html());
                    totalPrice += Number($(quantity[i]).html() * shipping_price);
                }
                $(".subTotalHeader").html("$" + totalPrice.toFixed(2));
            }, totalProduct.length * 500);
        }
    };
    /*=============================================
    Función para remover productos de la lista de carrito de compras
    =============================================*/
    HeaderComponent.prototype.removeProduct = function (product, details) {
        console.log("product", product);
        if (localStorage.getItem("list")) {
            var shoppingCart_1 = JSON.parse(localStorage.getItem("list"));
            shoppingCart_1.forEach(function (list, index) {
                if (list.product == product && list.details == details.toString()) {
                    shoppingCart_1.splice(index, 1);
                }
            });
            /*=============================================
           Actualizamos en LocalStorage la lista del carrito de compras
           =============================================*/
            localStorage.setItem("list", JSON.stringify(shoppingCart_1));
            funciones_1.Sweetalert.fnc("success", "product removed", this.router.url);
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: '../pages/header.component.html',
            styleUrls: ['../styles/header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
