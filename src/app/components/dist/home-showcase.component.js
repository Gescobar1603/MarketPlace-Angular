"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeShowcaseComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var HomeShowcaseComponent = /** @class */ (function () {
    function HomeShowcaseComponent(categoriesService) {
        this.categoriesService = categoriesService;
        this.path = config_1.Path.url;
        this.categories = [];
        this.cargando = false;
    }
    HomeShowcaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*=============================================
        Tomamos la data de las categorias
        =============================================*/
        var getCategories = [];
        this.categoriesService.getDataCategoria()
            .subscribe(function (resp) {
            var i;
            for (i in resp) {
                getCategories.push(resp[i]);
            }
            /*=============================================
            Ordenamos de mayor vistas a menor vistas el arreglo de objetos
            =============================================*/
            getCategories.sort(function (a, b) {
                return (b.vistas - a.vistas);
            });
            /*=============================================
            Filtramos hasta 6 categorías
            =============================================*/
            getCategories.forEach(function (category, index) {
                if (index < 4) {
                    _this.categories[index] = getCategories[index];
                    _this.cargando = false;
                }
            });
        });
    };
    HomeShowcaseComponent = __decorate([
        core_1.Component({
            selector: 'app-home-showcase',
            templateUrl: '../pages/home-showcase.component.html',
            styleUrls: ['../styles/home-showcase.component.css']
        })
    ], HomeShowcaseComponent);
    return HomeShowcaseComponent;
}());
exports.HomeShowcaseComponent = HomeShowcaseComponent;
