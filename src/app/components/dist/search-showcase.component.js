"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchShowcaseComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var SearchShowcaseComponent = /** @class */ (function () {
    function SearchShowcaseComponent(productsService, activateRoute, usersService, router) {
        this.productsService = productsService;
        this.activateRoute = activateRoute;
        this.usersService = usersService;
        this.router = router;
        this.path = config_1.Path.url;
        this.products = [];
        this.render = true;
        this.cargando = false;
        this.rating = [];
        this.reviews = [];
        this.price = [];
        this.params = null;
        this.productFound = 0;
        this.currentRoute = null;
        this.totalPage = 0;
        this.sortItems = [];
        this.sortValues = [];
        this.properties = ["category", "nombre", "store", "sub_category", "tag", "url"];
        this.listProducts = [];
    }
    SearchShowcaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*=============================================
       Capturamos el parámetro URL
       =============================================*/
        this.params = this.activateRoute.snapshot.params["param"].split("&")[0];
        this.sort = this.activateRoute.snapshot.params["param"].split("&")[1];
        this.page = this.activateRoute.snapshot.params["param"].split("&")[2];
        /*=============================================
        Evaluamos que el segundo parámetro sea de paginación
        =============================================*/
        if (Number.isInteger(Number(this.sort))) {
            this.page = this.sort;
            this.sort = undefined;
        }
        /*=============================================
        Evaluamos que el parámetro de orden no esté definido
        =============================================*/
        if (this.sort == undefined) {
            this.currentRoute = "search/" + this.params;
        }
        else {
            this.currentRoute = "search/" + this.params + "&" + this.sort;
        }
        /*=============================================
        Filtramos data de productos con todas las propiedades
        =============================================*/
        this.properties.forEach(function (property) {
            _this.productsService.getSearchData(property, _this.params)
                .subscribe(function (resp) {
                var i;
                for (i in resp) {
                    _this.listProducts.push(resp[i]);
                }
                _this.productsFnc(_this.listProducts);
            });
        });
    };
    /*=============================================
  Declaramos función para mostrar el catálogo de productos
  =============================================*/
    SearchShowcaseComponent.prototype.productsFnc = function (response) {
        var _this = this;
        if (response.length > 0) {
            this.products = [];
            /*=============================================
          Hacemos un recorrido por la respuesta que nos traiga el filtrado
          =============================================*/
            var i = void 0;
            var getProducts_1 = [];
            var total = 0;
            for (i in response) {
                total++;
                getProducts_1.push(response[i]);
            }
            /*=============================================
            Definimos el total de productos y la paginación de productos
            =============================================*/
            this.productFound = total;
            this.totalPage = Math.ceil(Number(this.productFound) / 6);
            /*=============================================
            Ordenamos el arreglo de objetos lo mas actual a lo más antiguo
            =============================================*/
            if (this.sort == undefined || this.sort == "fisrt") {
                getProducts_1.sort(function (a, b) {
                    return (b.date_created - a.date_created);
                });
                this.sortItems = [
                    "Sort by first",
                    "Sort by latest",
                    "Sort by popularity",
                    "Sort by price: low to high",
                    "Sort by price: high to low"
                ];
                this.sortValues = [
                    "first",
                    "latest",
                    "popularity",
                    "low",
                    "high"
                ];
            }
            /*=============================================
            Ordenamos el arreglo de objetos lo mas antiguo a lo más actual
            =============================================*/
            if (this.sort == "latest") {
                getProducts_1.sort(function (a, b) {
                    return (a.date_created - b.date_created);
                });
                this.sortItems = [
                    "Sort by latest",
                    "Sort by first",
                    "Sort by popularity",
                    "Sort by price: low to high",
                    "Sort by price: high to low"
                ];
                this.sortValues = [
                    "latest",
                    "first",
                    "popularity",
                    "low",
                    "high"
                ];
            }
            /*=============================================
            Ordenamos el arreglo de objetos lo mas visto
            =============================================*/
            if (this.sort == "popularity") {
                getProducts_1.sort(function (a, b) {
                    return (b.views - a.views);
                });
                this.sortItems = [
                    "Sort by popularity",
                    "Sort by first",
                    "Sort by latest",
                    "Sort by price: low to high",
                    "Sort by price: high to low"
                ];
                this.sortValues = [
                    "popularity",
                    "first",
                    "latest",
                    "low",
                    "high"
                ];
            }
            /*=============================================
            Ordenamos el arreglo de objetos de menor a mayor precio
            =============================================*/
            if (this.sort == "low") {
                getProducts_1.sort(function (a, b) {
                    return (a.precio - b.precio);
                });
                this.sortItems = [
                    "Sort by price: low to high",
                    "Sort by first",
                    "Sort by latest",
                    "Sort by popularity",
                    "Sort by price: high to low"
                ];
                this.sortValues = [
                    "low",
                    "first",
                    "latest",
                    "popularity",
                    "high"
                ];
            }
            /*=============================================
            Ordenamos el arreglo de objetos de mayor a menor precio
            =============================================*/
            if (this.sort == "high") {
                getProducts_1.sort(function (a, b) {
                    return (b.precio - a.precio);
                });
                this.sortItems = [
                    "Sort by price: high to low",
                    "Sort by first",
                    "Sort by latest",
                    "Sort by popularity",
                    "Sort by price: low to high"
                ];
                this.sortValues = [
                    "high",
                    "first",
                    "latest",
                    "popularity",
                    "low"
                ];
            }
            /*=============================================
            Filtramos solo hasta 10 productos
            =============================================*/
            getProducts_1.forEach(function (product, index) {
                /*=============================================
                Evaluamos si viene número de página definida
                =============================================*/
                if (_this.page == undefined) {
                    _this.page = 1;
                }
                /*=============================================
                Configuramos la paginación desde - hasta
                =============================================*/
                var first = Number(index) + (_this.page * 6) - 6;
                var last = 6 * _this.page;
                /*=============================================
                Filtramos los productos a mostrar
                =============================================*/
                if (first < last) {
                    if (getProducts_1[first] != undefined) {
                        _this.products.push(getProducts_1[first]);
                        _this.rating.push(funciones_1.DinamicRating.fnc(getProducts_1[first]));
                        _this.reviews.push(funciones_1.DinamicReviews.fnc(_this.rating[index]));
                        _this.price.push(funciones_1.DinamicPrice.fnc(getProducts_1[first]));
                        _this.cargando = false;
                    }
                }
            });
        }
        else {
            this.cargando = false;
        }
    };
    /*=============================================
  Función que nos avisa cuando finaliza el renderizado de Angular
  =============================================*/
    SearchShowcaseComponent.prototype.callback = function (params) {
        if (this.render) {
            this.render = false;
            funciones_1.Rating.fnc();
            funciones_1.Pagination.fnc();
            funciones_1.Select2Cofig.fnc();
            funciones_1.Tabs.fnc();
            /*=============================================
          Captura del Select Sort Items
          =============================================*/
            $(".sortItems").change(function () {
                window.open("search/" + params + "&" + $(this).val(), '_top');
            });
        }
    };
    /*=============================================
      Función para agregar productos a la lista de deseos
      =============================================*/
    SearchShowcaseComponent.prototype.addWishlist = function (product) {
        this.usersService.addWishlist(product);
    };
    /*=============================================
      Función para agregar productos al carrito de compras
      =============================================*/
    SearchShowcaseComponent.prototype.addShoppingCart = function (product, unit, details) {
        var url = this.router.url;
        var item = {
            product: product,
            unit: unit,
            details: details,
            url: url
        };
        this.usersService.addSoppingCart(item);
    };
    SearchShowcaseComponent = __decorate([
        core_1.Component({
            selector: 'app-search-showcase',
            templateUrl: '../pages/search-showcase.component.html',
            styleUrls: ['../styles/search-showcase.component.css']
        })
    ], SearchShowcaseComponent);
    return SearchShowcaseComponent;
}());
exports.SearchShowcaseComponent = SearchShowcaseComponent;
