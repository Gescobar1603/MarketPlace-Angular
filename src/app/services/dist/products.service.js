"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var ProductsService = /** @class */ (function () {
    function ProductsService(http) {
        this.http = http;
        this.api = config_1.Api.url;
    }
    ProductsService.prototype.getDataBanner = function () {
        return this.http.get(this.api + "banner.json");
    };
    ProductsService.prototype.getDataBannerDefault = function () {
        return this.http.get(this.api + "banner-promotion.json");
    };
    ProductsService.prototype.getDataSlider = function () {
        return this.http.get(this.api + "slider.json");
    };
    ProductsService.prototype.getDataProduct = function () {
        return this.http.get(this.api + "products.json");
    };
    ProductsService.prototype.getLimitData = function (startAt, limitToFirst) {
        return this.http.get(this.api + "slider.json?orderBy=\"$key\"&startAt=\"" + startAt + "\"&limitToFirst=" + limitToFirst + "&print=pretty");
    };
    ProductsService.prototype.getLimitData2 = function (startAt, limitToFirst) {
        return this.http.get(this.api + "banner-promotion.json?orderBy=\"$key\"&startAt=\"" + startAt + "\"&limitToFirst=" + limitToFirst + "&print=pretty");
    };
    ProductsService.prototype.getFilterData = function (orderBy, equalTo) {
        return this.http.get(this.api + "products.json?orderBy=\"" + orderBy + "\"&equalTo=\"" + equalTo + "\"&print=pretty");
    };
    ProductsService.prototype.getFilterDataWithLimit = function (orderBy, equalTo, limitToFirst) {
        return this.http.get(this.api + "products.json?orderBy=\"" + orderBy + "\"&equalTo=\"" + equalTo + "\"&limitToFirst=" + limitToFirst + "&print=pretty");
    };
    ProductsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
