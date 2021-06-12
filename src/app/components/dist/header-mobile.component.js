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
    function HeaderMobileComponent(categoriasService, subCategoriasService, usersService) {
        this.categoriasService = categoriasService;
        this.subCategoriasService = subCategoriasService;
        this.usersService = usersService;
        this.path = config_1.Path.url;
        this.categorias = null;
        this.renderizado = true;
        this.listaCategorias = [];
        this.authValidate = false;
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
