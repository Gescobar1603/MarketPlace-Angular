"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductLeftComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var ProductLeftComponent = /** @class */ (function () {
    function ProductLeftComponent(activateRoute, productsService, usersService, router) {
        this.activateRoute = activateRoute;
        this.productsService = productsService;
        this.usersService = usersService;
        this.router = router;
        this.path = config_1.Path.url;
        this.product = [];
        this.rating = [];
        this.reviews = [];
        this.price = [];
        this.cargando = false;
        this.render = true;
        this.countd = [];
        this.gallery = [];
        this.renderGallery = true;
        this.video = null;
        this.tags = null;
        this.oferta = false;
    }
    ProductLeftComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        this.productsService.getFilterData("url", this.activateRoute.snapshot.params["param"])
            .subscribe(function (resp) {
            _this.productsFnc(resp);
        });
    };
    /*=============================================
    Declaramos función para mostrar los productos recomendados
    =============================================*/
    ProductLeftComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.product = [];
        /*=============================================
        Hacemos un recorrido por la respuesta que nos traiga el filtrado
        =============================================*/
        var i;
        var getProduct = [];
        for (i in response) {
            getProduct.push(response[i]);
        }
        /*=============================================
        Filtramos el producto
        =============================================*/
        getProduct.forEach(function (product, index) {
            _this.product.push(product);
            _this.rating.push(funciones_1.DinamicRating.fnc(_this.product[index]));
            _this.reviews.push(funciones_1.DinamicReviews.fnc(_this.rating[index]));
            _this.price.push(funciones_1.DinamicPrice.fnc(_this.product[index]));
            /*=============================================
            Agregamos la fecha al descontador
            =============================================*/
            if (_this.product[index].oferta != "") {
                var today = new Date();
                var offerDate = new Date(parseInt(JSON.parse(_this.product[index].oferta)[2].split("-")[0]), parseInt(JSON.parse(_this.product[index].oferta)[2].split("-")[1]) - 1, parseInt(JSON.parse(_this.product[index].oferta)[2].split("-")[2]));
                if (today < offerDate) {
                    _this.oferta = true;
                    var date = JSON.parse(_this.product[index].oferta)[2];
                    _this.countd.push(new Date(parseInt(date.split("-")[0]), parseInt(date.split("-")[1]) - 1, parseInt(date.split("-")[2])));
                }
            }
            /*=============================================
            Gallery
            =============================================*/
            _this.gallery.push(JSON.parse(_this.product[index].gallery));
            /*=============================================
            Video
            =============================================*/
            if (JSON.parse(_this.product[index].video)[0] == "youtube") {
                _this.video = "https://www.youtube.com/embed/" + JSON.parse(_this.product[index].video)[1] + "?rel=0&autoplay=0 ";
            }
            /*=============================================
             Agregamos los tags
             =============================================*/
            _this.tags = _this.product[index].tag.split(",");
            /*=============================================
              Total Reviews
              =============================================*/
            _this.totalReviews = JSON.parse(_this.product[index].reviews).length;
            _this.cargando = false;
        });
    };
    /*=============================================
    Función Callback()
    =============================================*/
    ProductLeftComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            funciones_1.Rating.fnc();
            funciones_1.CountDown.fnc();
            funciones_1.ProgressBar.fnc();
            funciones_1.Tabs.fnc();
            funciones_1.Quantity.fnc();
            funciones_1.Tooltip.fnc();
            /*=============================================
            Agregamos detalles del producto
            =============================================*/
            if ($(".ps-product__variations").attr("specification") != "") {
                /*=============================================
                Recorremos el array de objetos de detalles
                =============================================*/
                JSON.parse($(".ps-product__variations").attr("specification")).forEach(function (detail, index) {
                    /*=============================================
                    Seleccionamos el nombre de propiedad de cada detalle
                    =============================================*/
                    var property = Object.keys(detail).toString();
                    /*=============================================
                    Construimos el HTML que va a aparecer en la vista
                    =============================================*/
                    var figure = "<figure class=\"details" + index + "\">\n                      \n                                      <figcaption>" + property + ": <strong>Choose an option</strong></figcaption>\n  \n                                      <div class=\"d-flex\">\n                                      \n                                      </div>\n  \n                                  </figure>";
                    /*=============================================
                    Pintamos en la vista el HTML de figure
                    =============================================*/
                    $(".ps-product__variations").append("\n                          \n                          " + figure + "\n  \n                      ");
                    for (var i in detail[property]) {
                        if (property == "Color") {
                            $(".details" + index + " .d-flex").append("\n  \n                                   <div\n                                      class=\"rounded-circle mr-3 details " + property + "\"\n                                      detailType=\"" + property + "\"\n                                      detailValue=\"" + detail[property][i] + "\"\n                                      data-toggle=\"tooltip\" title=\"" + detail[property][i] + "\"\n                                      style=\"background-color:" + detail[property][i] + "; width:30px; height:30px; cursor:pointer; border:1px solid #bbb\"></div>\n  \n                              ");
                        }
                        else {
                            $(".details" + index + " .d-flex").append("\n  \n                                  <div\n                                      class=\"py-2 px-3 mr-3 details " + property + "\"\n                                      detailType=\"" + property + "\"\n                                      detailValue=\"" + detail[property][i] + "\"\n                                      data-toggle=\"tooltip\" title=\"" + detail[property][i] + "\"\n                                      style=\"cursor:pointer; border:1px solid #bbb\">" + detail[property][i] + "</div>\n                              ");
                        }
                    }
                });
            }
            /*=============================================
            Agregamos detalles del producto al localstorage
            =============================================*/
            $(document).on("click", ".details", function () {
                /*=============================================
                Señalar el detalle escogido
                =============================================*/
                var details = $(".details." + $(this).attr("detailType"));
                for (var i = 0; i < details.length; i++) {
                    $(details[i]).css({ "border": "1px solid #bbb" });
                }
                $(this).css({ "border": "3px solid #bbb" });
                /*=============================================
                Preguntar si existen detalles en el LocalStorage
                =============================================*/
                if (localStorage.getItem("details")) {
                    var details_1 = JSON.parse(localStorage.getItem("details"));
                    for (var i in details_1) {
                        details_1[i][$(this).attr("detailType")] = $(this).attr("detailValue");
                        localStorage.setItem("details", JSON.stringify(details_1));
                    }
                }
                else {
                    localStorage.setItem("details", "[{\"" + $(this).attr("detailType") + "\":\"" + $(this).attr("detailValue") + "\"}]");
                }
            });
        }
    };
    /*=============================================
  Función Callback Galería
  =============================================*/
    ProductLeftComponent.prototype.callbackGallery = function () {
        if (this.renderGallery) {
            this.renderGallery = false;
            funciones_1.SlickConfig.fnc();
            funciones_1.ProductLightbox.fnc();
        }
    };
    /*=============================================
      Función para agregar productos a la lista de deseos
      =============================================*/
    ProductLeftComponent.prototype.addWishlist = function (product) {
        this.usersService.addWishlist(product);
    };
    /*=============================================
     Función para agregar productos al carrito de compras
     =============================================*/
    ProductLeftComponent.prototype.addShoppingCart = function (product, unit, details) {
        var url = this.router.url;
        var item = {
            product: product,
            unit: unit,
            details: details,
            url: url
        };
        this.usersService.addSoppingCart(item);
    };
    ProductLeftComponent = __decorate([
        core_1.Component({
            selector: 'app-product-left',
            templateUrl: '../pages/product-left.component.html',
            styleUrls: ['../styles/product-left.component.css']
        })
    ], ProductLeftComponent);
    return ProductLeftComponent;
}());
exports.ProductLeftComponent = ProductLeftComponent;
