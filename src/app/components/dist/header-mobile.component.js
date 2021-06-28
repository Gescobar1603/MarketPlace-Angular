"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderMobileComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var HeaderMobileComponent = /** @class */ (function () {
    function HeaderMobileComponent(categoriasService, subCategoriasService, usersService, router, productsService) {
        this.categoriasService = categoriasService;
        this.subCategoriasService = subCategoriasService;
        this.usersService = usersService;
        this.router = router;
        this.productsService = productsService;
        this.path = config_1.Path.url;
        this.categorias = null;
        this.renderizado = true;
        this.listaCategorias = [];
        this.authValidate = false;
        this.shoppingCart = [];
        this.totalShoppingCart = 0;
        this.renderShopping = true;
        this.subTotal = "<h3>Sub Total:<strong class=\"subTotalHeader\"><div class=\"spinner-border\"></div></strong></h3>";
    }
    HeaderMobileComponent.prototype.ngOnInit = function () {
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
        this.categoriasService.getDataCategoria()
            .subscribe(function (resp) {
            _this.categorias = resp;
            /*============================================================
            Recorrido por el objeto de la data de categorias
            =============================================================*/
            var i;
            for (i in resp) {
                /*============================================================
                 Separamos los nombres de las categorias
                =============================================================*/
                _this.listaCategorias.push(resp[i].nombre);
            }
        });
        /*============================================================
        Activamos el efecto toogle en el listado de subactegorias
        ( para que no se trabe el troogle a la hora de llamar los datos dianmicos)
        =============================================================*/
        $(document).on("click", ".sub-toggle", function () {
            $(this).parent().children('ul').toggle();
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
    HeaderMobileComponent.prototype.goSearch = function (search) {
        if (search.length == 0 || funciones_1.Search.fnc(search) == undefined) {
            return;
        }
        window.open("search/" + funciones_1.Search.fnc(search), '_top');
    };
    /*============================================================
      Activamos el efecto toogle en el listado de subactegorias
    =============================================================*/
    HeaderMobileComponent.prototype.callback = function () {
        var _this = this;
        if (this.renderizado) {
            this.renderizado = false;
            var subcategoriasArray_1 = [];
            /*============================================================
              Separa la coleccion de las subcategorias filtrando con los nombres decategoria
            =============================================================*/
            this.listaCategorias.forEach(function (categoria) {
                /*============================================================
                  Tomamos la coleccion de las subcategorias filtrando con los nombres
                  de categoria
                =============================================================*/
                _this.subCategoriasService.getFilterDataSubCategoria("categoria", categoria)
                    .subscribe(function (resp) {
                    /*============================================================
                      Hacemos un recorrido por la coleccion general de subcategorias y clasificamos las subcategorias y url
                      deacuerdo a la categoria que corresponda
                    =============================================================*/
                    var i = null;
                    for (i in resp) {
                        subcategoriasArray_1.push({
                            "categoria": resp[i].categoria,
                            "subcategoria": resp[i].nombre,
                            "url": resp[i].nombre.replace(/\s+/g, '')
                        });
                    }
                    /*============================================================
                      Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorias
                    =============================================================*/
                    for (i in subcategoriasArray_1) {
                        if (categoria == subcategoriasArray_1[i].categoria) {
                            $("[categoria='" + categoria + "']").append("<li class=\"current-menu-item \">\n                      <a href=\"products/" + subcategoriasArray_1[i].subcategoria + "\">" + subcategoriasArray_1[i].subcategoria + "</a>\n                  </li>");
                        }
                    }
                });
            });
        }
    };
    /*=============================================
    Función que nos avisa cuando finaliza el renderizado de Angular
    =============================================*/
    HeaderMobileComponent.prototype.callbackShopping = function () {
        if (this.renderShopping) {
            this.renderShopping = false;
            /*=============================================
            Sumar valores para el precio total
            =============================================*/
            var totalProduct = $(".ps-product--cart-mobile");
            setTimeout(function () {
                var price = $(".pShoppingHeaderM .end-price");
                var quantity = $(".qShoppingHeaderM");
                var shipping = $(".sShoppingHeaderM");
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
    HeaderMobileComponent.prototype.removeProduct = function (product, details) {
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
    HeaderMobileComponent = __decorate([
        core_1.Component({
            selector: 'app-header-mobile',
            templateUrl: '../pages/header-mobile.component.html',
            styleUrls: ['../styles/header-mobile.component.css']
        })
    ], HeaderMobileComponent);
    return HeaderMobileComponent;
}());
exports.HeaderMobileComponent = HeaderMobileComponent;
