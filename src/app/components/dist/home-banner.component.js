"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeBannerComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var HomeBannerComponent = /** @class */ (function () {
    function HomeBannerComponent(productsService) {
        this.productsService = productsService;
        this.path = config_1.Path.url;
        this.banner_home = [];
        this.renderizado = true;
        this.preload = false;
    }
    HomeBannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.preload = true;
        this.productsService.getDataSlider()
            .subscribe(function (resp) {
            var i;
            var size = 0;
            var index = 0;
            for (i in resp) {
                size++;
            }
            if (size > 5) {
                index = Math.floor(Math.random() * (size - 5));
            }
            _this.productsService.getLimitData(Object.keys(resp)[index], 5)
                .subscribe(function (resp) {
                var i;
                for (i in resp) {
                    _this.banner_home.push(JSON.parse(resp[i].horizontal_slider));
                    _this.preload = false;
                }
            });
        });
    };
    /*============================================================
     Funcion que nos avisa cuando termina el renderizado de angular
     =============================================================*/
    HomeBannerComponent.prototype.callback = function () {
        if (this.renderizado) {
            this.renderizado = false;
            funciones_1.OwlCarouselConfig.fnc();
            funciones_1.BackgroundImage.fnc();
        }
    };
    HomeBannerComponent = __decorate([
        core_1.Component({
            selector: 'app-home-banner',
            templateUrl: '../pages/home-banner.component.html',
            styleUrls: ['../styles/home-banner.component.css']
        })
    ], HomeBannerComponent);
    return HomeBannerComponent;
}());
exports.HomeBannerComponent = HomeBannerComponent;
