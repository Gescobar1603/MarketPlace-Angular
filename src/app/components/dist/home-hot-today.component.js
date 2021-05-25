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
    function HomeHotTodayComponent(productsService, ventasService) {
        this.productsService = productsService;
        this.ventasService = ventasService;
        this.path = config_1.Path.url;
        this.indexes = [];
        this.renderizado = true;
        this.renderizadoTopVentas = true;
        this.products = [];
        this.cargando = false;
        this.topVentas = [];
        this.topVentasBloque = [];
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
                }
            }
        });
        /*============================================================
          Tomamos la data de las ventas
        =============================================================*/
        var getVentas = [];
        this.ventasService.getDataVentas().subscribe(function (resp) {
            /*============================================================
              Recorremos cada venta para separar los productos y las cantidades
            =============================================================*/
            var i;
            for (i in resp) {
                getVentas.push({
                    "producto": resp[i].producto,
                    "cantidad": resp[i].cantidad
                });
            }
            /*============================================================
              Ordenamos de mayor a menor el arreglo de objetos
            =============================================================*/
            getVentas.sort(function (a, b) {
                return (b.cantidad - a.cantidad);
            });
            /*============================================================
             Sacamos del arreglo los productos repetidos dejando los de mayor venta
           =============================================================*/
            var filtrarVentas = [];
            getVentas.forEach(function (venta) {
                if (!filtrarVentas.find(function (resp) { return resp.producto == venta.producto; })) {
                    var producto = venta.producto, cantidad = venta.cantidad;
                    filtrarVentas.push({ producto: producto, cantidad: cantidad });
                }
            });
            /*============================================================
             Filtramos la data de productos buscadno coincidencias con las ventas
           =============================================================*/
            var block = 0;
            filtrarVentas.forEach(function (venta, index) {
                /*============================================================
                  Filtramos hasta 20 ventas
                =============================================================*/
                if (index < 20) {
                    block++;
                    _this.productsService.getFilterData("nombre", venta.producto)
                        .subscribe(function (resp) {
                        var i;
                        for (i in resp) {
                            _this.topVentas.push(resp[i]);
                        }
                    });
                }
            });
            /*============================================================
              Enviamos el maximo de bloques apra mostrar 4 productos por bloque
              =============================================================*/
            for (var i_1 = 0; i_1 < Math.round(block / 5); i_1++) {
                _this.topVentasBloque.push(i_1);
            }
            console.log(_this.topVentasBloque);
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
            /*============================================================
            Seleccionar del Dom los elementos de las ofertas
            =============================================================*/
            var oferta_1 = $(".oferta_1");
            var oferta_2 = $(".oferta_2");
            var oferta_3 = $(".oferta_3");
            /*============================================================
            Seleccionar del Dom los elementos de las reseñas
            =============================================================*/
            var review_1 = $(".review_1");
            var review_2 = $(".review_2");
            var review_3 = $(".review_3");
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
                    $(galleryMix_3[i]).append("<div class=\"item\">\n                <img src=\"assets/img/products/" + ($(galleryMix_1[i]).attr("category")) + "/deal-hot/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">\n            </div>");
                }
                /*============================================================
                Capturamos el array de ofertas de cada producto
                =============================================================*/
                var oferta = JSON.parse($(oferta_1[i]).attr("oferta"));
                /*=============================================
                      Capturamos el precio de cada producto
                      =============================================*/
                var precio = Number($(oferta_1[i]).attr("precio"));
                /*=============================================
                Preguntamos si es descuento
                =============================================*/
                if (oferta[0] == "Descuento") {
                    $(oferta_1[i]).html("<span>Ahorra <br> $" + (precio * oferta[1] / 100).toFixed(2) + " </span>");
                    $(oferta_2[i]).html("$" + (precio - (precio * oferta[1] / 100)).toFixed(2));
                }
                /*=============================================
                Preguntamos si es precio fijo
                =============================================*/
                if (oferta[0] == "Fijo") {
                    $(oferta_1[i]).html("<span>Save <br> $" + (precio - oferta[1]).toFixed(2) + "</span>");
                    $(oferta_2[i]).html("$" + oferta[1]);
                }
                /*=============================================
                      Agregamos la fecha al descontador
                      =============================================*/
                $(oferta_3[i]).attr("data-time", new Date(parseInt(oferta[2].split("-")[0]), parseInt(oferta[2].split("-")[1]) - 1, parseInt(oferta[2].split("-")[2])));
                /*=============================================
                Calculamos el total de las calificaciones de las reseñas
                =============================================*/
                var totalReview = 0;
                for (var f = 0; f < JSON.parse($(review_1[i]).attr("reviews")).length; f++) {
                    totalReview += Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"]);
                }
                /*=============================================
                Imprimimos el total de las calificaciones para cada producto
                =============================================*/
                var rating = Math.round(totalReview / JSON.parse($(review_1[i]).attr("reviews")).length);
                $(review_3[i]).html(rating);
                for (var f = 1; f <= 5; f++) {
                    $(review_2[i]).append("<option value=\"2\">" + f + "</option>");
                    if (rating == f) {
                        $(review_2[i]).children('option').val(1);
                    }
                }
            }
            /*=============================================
            Ejecutar funciones globales con respecto a la galería mixta
            =============================================*/
            funciones_1.OwlCarouselConfig.fnc();
            funciones_1.CarouselNavigation.fnc();
            funciones_1.SlickConfig.fnc();
            funciones_1.ProductLightbox.fnc();
            /*=============================================
            Ejecutar funciones globales con respecto a las ofertas
            =============================================*/
            funciones_1.CountDown.fnc();
            /*=============================================
            Ejecutar funciones globales con respecto a las reseñas
            =============================================*/
            funciones_1.Rating.fnc();
            /*=============================================
            Ejecutar funciones globales con respecto al Stock
            =============================================*/
            funciones_1.ProgressBar.fnc();
        }
    };
    /*============================================================
      Funcion que nos avisa cuando termina el renderizado de angular
      =============================================================*/
    HomeHotTodayComponent.prototype.callBackTopVentas = function (topVentas) {
        if (this.renderizadoTopVentas) {
            this.renderizadoTopVentas = false;
            /*=============================================
            Capturamos la cantidad de bloques que existe en el DOM
            =============================================*/
            var topVentaBloque_1 = $(".topVentaBloque");
            var top20Array_1 = [];
            /*=============================================
            Ejecutamos en SetTimeOut - por cada bloque un segundo de espera
            =============================================*/
            setTimeout(function () {
                console.log(topVentaBloque_1.length);
                for (var i = 0; i < topVentaBloque_1.length; i++) {
                    /*=============================================
                    Agrupamos la cantidad de 4 productos por bloque
                    =============================================*/
                    top20Array_1.push(topVentas.slice(i * topVentaBloque_1.length, (i * topVentaBloque_1.length) + topVentaBloque_1.length));
                    /*=============================================
                              Hacemos un recorrido por el nuevo array de objetos
                              =============================================*/
                    var f = void 0;
                    for (f in top20Array_1[i]) {
                        /*=============================================
                        Definimos si el precio del producto tiene oferta o no
                        =============================================*/
                        var precio = void 0;
                        var tipo = void 0;
                        var valor = void 0;
                        var oferta = void 0;
                        if (top20Array_1[i][f].oferta != "") {
                            tipo = JSON.parse(top20Array_1[i][f].oferta)[0];
                            valor = JSON.parse(top20Array_1[i][f].oferta)[1];
                            if (tipo == "Descuento") {
                                oferta = (top20Array_1[i][f].precio - (top20Array_1[i][f].precio * valor / 100)).toFixed(2);
                            }
                            if (tipo == "Fijo") {
                                oferta = valor;
                            }
                            precio = "<p class=\"ps-product__price sale\">$" + oferta + " <del>$" + top20Array_1[i][f].precio + " </del></p>";
                        }
                        else {
                            precio = "<p class=\"ps-product__price\">$" + top20Array_1[i][f].precio + " </p>";
                        }
                        $(topVentaBloque_1[i]).append("\n\n            <div class=\"ps-product--horizontal\">\n\n            <div class=\"ps-product__thumbnail\">\n                <a href=\"product/" + top20Array_1[i][f].nombre.replace(/\s+/g, '') + "\">\n                    <img src=\"assets/img/products/" + top20Array_1[i][f].category + "/" + top20Array_1[i][f].imagen + "\" alt=\"\">\n                </a>\n            </div>\n\n            <div class=\"ps-product__content\">\n\n                <a class=\"ps-product__title\" href=\"product/" + top20Array_1[i][f].nombre.replace(/\s+/g, '') + "\">" + top20Array_1[i][f].nombre.substr(0, 35) + " ...</a>\n\n                <div class=\"ps-product__rating\">\n\n                    <select class=\"ps-rating\" data-read-only=\"true\">\n                                <option value=\"1\">1</option>\n                                <option value=\"1\">2</option>\n                                <option value=\"1\">3</option>\n                                <option value=\"1\">4</option>\n                                <option value=\"2\">5</option>\n                            </select>\n\n                    <span>01</span>\n\n                </div>\n\n                " + precio + "\n\n            </div>\n\n        </div>\n\t\t\t\t\t\t");
                    }
                }
                /*=============================================
                Modificamos el estilo del plugin OWL Carousel
                =============================================*/
                $(".owl-dots").css({ "bottom": "0" });
                $(".owl-dot").css({ "background": "#ddd" });
            }, topVentaBloque_1.length * 400);
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
