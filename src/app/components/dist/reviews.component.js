"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReviewsComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var ReviewsComponent = /** @class */ (function () {
    function ReviewsComponent() {
        this.path = config_1.Path.url;
        this.rating = [];
        this.itemReviews = [];
        this.render = true;
    }
    ReviewsComponent.prototype.ngOnInit = function () {
        /*=============================================
        Rating
        =============================================*/
        this.rating.push(funciones_1.DinamicRating.fnc(this.childItem));
        /*=============================================
        Reviews
        =============================================*/
        var reviews = [];
        reviews.push(funciones_1.DinamicReviews.fnc(this.rating[0]));
        for (var i = 0; i < 5; i++) {
            $(".reviewsOption").append("\n\t\t\t\n\t\t\t\t<option value=\"" + reviews[0][i] + "\">" + (i + 1) + "</option>\n\n        \t");
        }
        funciones_1.Rating.fnc();
        /*=============================================
        Total Reviews
        =============================================*/
        this.totalReviews = JSON.parse(this.childItem["reviews"]).length;
        /*=============================================
        Star Block
        =============================================*/
        //Necesitamos un array vacío para almacenar los review
        var arrayReview = [];
        JSON.parse(this.childItem["reviews"]).forEach(function (rev) {
            arrayReview.push(rev.review);
        });
        //Ordenamos el array de mayor a menor    
        arrayReview.sort();
        var objectStar = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        };
        //Identificamos que valores se repitem y cuales no se repiten   
        arrayReview.forEach(function (value, index, arr) {
            //Tomamos del array completo el primer índice de cada valor
            var first_index = arr.indexOf(value);
            //Tomamos del array completo el último índice de cada valor
            var last_index = arr.lastIndexOf(value);
            //Comparamos si tanto el primer índice como el último índice del mismo valor son diferentes, Si es diferente significa que se repite varias veces, si son iguales significa que nunca se repite
            if (first_index !== last_index) {
                //incrementamos valores repetidos en las propiedades del objeto Star
                objectStar[value] += 1;
            }
            else {
                //incrementamos valores que no se repiten en las propiedades del objeto Star
                objectStar[value] += 1;
            }
        });
        //Hacemos un recorrido por cada uno de los renglones de estrellas
        for (var i = 5; i > 0; i--) {
            //Hacemos una regla de 3: la cantidad que suma cada estella multiplicado por 100 dividido la cantidad de calificaciones
            var starPercentage = Math.round((objectStar[i] * 100) / arrayReview.length);
            $(".ps-block--average-rating").append("\n\t\t\t\t\n\t\t\t<div class=\"ps-block__star\">\n\n            \t<span>" + i + " Star</span>\n\n                <div class=\"ps-progress\" data-value=\"" + starPercentage + "\">\n\n                \t<span></span>\n\n                </div>\n\n                <span>" + starPercentage + "%</span>\n\n            </div>\n\n\t    \t");
        }
        /*=============================================
        Enviamos a la vista las reseñas del producto
        =============================================*/
        this.itemReviews.push(JSON.parse(this.childItem["reviews"]));
    };
    ReviewsComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            var reviews = $("[reviews]");
            for (var i = 0; i < reviews.length; i++) {
                for (var r = 0; r < 5; r++) {
                    $(reviews[i]).append("\n\t\t\t\t\t\t\n\t\t\t\t\t\t<option value=\"2\">" + (r + 1) + "</option>\n\n\t\t        \t");
                    if ($(reviews[i]).attr("reviews") == (r + 1)) {
                        $(reviews[i]).children("option").val(1);
                    }
                }
            }
            funciones_1.Rating.fnc();
        }
    };
    __decorate([
        core_1.Input()
    ], ReviewsComponent.prototype, "childItem");
    ReviewsComponent = __decorate([
        core_1.Component({
            selector: 'app-reviews',
            templateUrl: '../pages/reviews.component.html',
            styleUrls: ['../styles/reviews.component.css']
        })
    ], ReviewsComponent);
    return ReviewsComponent;
}());
exports.ReviewsComponent = ReviewsComponent;
