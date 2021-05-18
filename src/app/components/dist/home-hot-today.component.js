"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeHotTodayComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var HomeHotTodayComponent = /** @class */ (function () {
    function HomeHotTodayComponent(productsService) {
        this.productsService = productsService;
        this.path = config_1.Path.url;
        this.indexes = [];
        this.renderizado = true;
        this.products = [];
        this.cargando = false;
    }
    HomeHotTodayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        var getProducts = [];
        var hoy = new Date();
        var fechaOferta = null;
        /*============================================================
        Tomamos la data de los productos
        =============================================================*/
        this.productsService.getDataProduct()
            .subscribe(function (resp) {
            /*============================================================
            Recorremos cada producto para separar las ofertas y el stock
            =============================================================*/
            var i;
            for (i in resp) {
                getProducts.push({
                    "oferta": JSON.parse(resp[i].oferta),
                    "stock": resp[i].stock
                });
                _this.products.push(resp[i]);
            }
            /*============================================================
            Recorremos cada oferta y stock para clasificar las ofertas actuales
            y los productos que si tengan el stock
            =============================================================*/
            for (i in getProducts) {
                fechaOferta = new Date(parseInt(getProducts[i]["oferta"][2].split("-")[0]), parseInt(getProducts[i]["oferta"][2].split("-")[1]), parseInt(getProducts[i]["oferta"][2].split("-")[2]));
                if (hoy < fechaOferta && getProducts[i]["stock"] > 0) {
                    _this.indexes.push(i);
                    _this.cargando = false;
                    console.log(_this.indexes);
                }
            }
        });
    };
    /*============================================================
      Funcion que nos avisa cuando termina el renderizado de angular
      =============================================================*/
    HomeHotTodayComponent.prototype.callback = function () {
        if (this.renderizado) {
            this.renderizado = false;
            /*============================================================
            Seleccionar del DOM los elementos de la geleria Mixta
            =============================================================*/
            var galleryMix_1 = $(".galleryMix_1");
            var galleryMix_2 = $(".galleryMix_2");
            var galleryMix_3 = $(".galleryMix_3");
            for (var i = 0; i < galleryMix_1.length; i++) {
                /*============================================================
                Recorremos la galeria de fotografias de cada producto
                =============================================================*/
                for (var f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++) {
                    /*============================================================
                      Agregar imágenes grandes
                    =============================================================*/
                    $(galleryMix_2[i]).append("<div class=\"item\">\n                <a href=\"assets/img/products/" + ($(galleryMix_1[i]).attr("category")) + "/deal-hot/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">  \n                  <img src=\"assets/img/products/" + ($(galleryMix_1[i]).attr("category")) + "/deal-hot/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">\n                </a>              \n              </div>");
                    /*============================================================
                      Agregar imágenes pequeñas
                    =============================================================*/
                    $(galleryMix_3[i]).append("<div class=\"item \">\n                <img src=\"assets/img/products/" + ($(galleryMix_1[i]).attr("category")) + "/deal-hot/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">\n            </div>");
                }
            }
            funciones_1.OwlCarouselConfig.fnc();
            funciones_1.CarouselNavigation.fnc();
            funciones_1.SlickConfig.fnc();
            funciones_1.ProductLightbox.fnc();
        }
    };
    HomeHotTodayComponent = __decorate([
        core_1.Component({
            selector: 'app-home-hot-today',
            templateUrl: '../pages/home-hot-today.component.html',
            styleUrls: ['../styles/home-hot-today.component.css']
        })
    ], HomeHotTodayComponent);
    return HomeHotTodayComponent;
}());
exports.HomeHotTodayComponent = HomeHotTodayComponent;
