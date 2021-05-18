"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePromotionComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var HomePromotionComponent = /** @class */ (function () {
    function HomePromotionComponent(productsService) {
        this.productsService = productsService;
        this.path = config_1.Path.url;
        this.banner_default = [];
        this.preload = false;
        this.url = [];
    }
    HomePromotionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.preload = true;
        this.productsService.getDataBannerDefault()
            .subscribe(function (resp) {
            var index = 0;
            _this.productsService.getLimitData2(Object.keys(resp)[index], 5)
                .subscribe(function (resp) {
                var i;
                for (i in resp) {
                    _this.banner_default.push((resp[i].banner_default));
                    _this.url.push(resp[i].nombre.replace(/\s+/g, ''));
                    _this.preload = false;
                }
            });
        });
    };
    HomePromotionComponent = __decorate([
        core_1.Component({
            selector: 'app-home-promotion',
            templateUrl: '../pages/home-promotion.component.html',
            styleUrls: ['../styles/home-promotion.component.css']
        })
    ], HomePromotionComponent);
    return HomePromotionComponent;
}());
exports.HomePromotionComponent = HomePromotionComponent;
