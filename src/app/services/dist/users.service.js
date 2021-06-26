"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var funciones_1 = require("../funciones");
var UsersService = /** @class */ (function () {
    function UsersService(http, productsService) {
        this.http = http;
        this.productsService = productsService;
        this.api = config_1.Api.url;
        this.register = config_1.Register.url;
        this.login = config_1.Login.url;
        this.sendEmailVerification = config_1.SendEmailVerification.url;
        this.confirmEmailVerification = config_1.ConfirmEmailVerification.url;
        this.getUserData = config_1.GetUserData.url;
        this.sendPasswordResetEmail = config_1.SendPasswordResetEmail.url;
        this.verifyPasswordResetCode = config_1.VerifyPasswordResetCode.url;
        this.confirmPasswordReset = config_1.ConfirmPasswordReset.url;
        this.changePassword = config_1.ChangePassword.url;
    }
    /*=============================================
    Registro en Firebase Authentication
    =============================================*/
    UsersService.prototype.registerAuth = function (user) {
        return this.http.post("" + this.register, user);
    };
    /*=============================================
    Registro en Firebase Database
    =============================================*/
    UsersService.prototype.registerDatabase = function (user) {
        delete user.first_name;
        delete user.last_name;
        delete user.password;
        delete user.returnSecureToken;
        return this.http.post(this.api + "/users.json", user);
    };
    /*=============================================
    Filtrar data para buscar coincidencias
    =============================================*/
    UsersService.prototype.getFilterData = function (orderBy, equalTo) {
        return this.http.get(this.api + "users.json?orderBy=\"" + orderBy + "\"&equalTo=\"" + equalTo + "\"&print=pretty");
    };
    /*=============================================
    Login en Firebase Authentication
    =============================================*/
    UsersService.prototype.loginAuth = function (user) {
        return this.http.post("" + this.login, user);
    };
    /*=============================================
    Enviar verificación de correo electrónico
    =============================================*/
    UsersService.prototype.sendEmailVerificationFnc = function (body) {
        return this.http.post("" + this.sendEmailVerification, body);
    };
    /*=============================================
    Confirmar email de verificación
    =============================================*/
    UsersService.prototype.confirmEmailVerificationFnc = function (body) {
        return this.http.post("" + this.confirmEmailVerification, body);
    };
    /*=============================================
    Actualizar data de usuario
    =============================================*/
    UsersService.prototype.patchData = function (id, value) {
        return this.http.patch(this.api + "users/" + id + ".json", value);
    };
    /*=============================================
    Validar idToken de Autenticación
    =============================================*/
    UsersService.prototype.authActivate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            /*=============================================
            Validamos que el idToken sea real
            =============================================*/
            if (localStorage.getItem("idToken")) {
                var body = {
                    idToken: localStorage.getItem("idToken")
                };
                _this.http.post("" + _this.getUserData, body)
                    .subscribe(function (resp) {
                    /*=============================================
                    Validamos fecha de expiración
                    =============================================*/
                    if (localStorage.getItem("expiresIn")) {
                        var expiresIn = Number(localStorage.getItem("expiresIn"));
                        var expiresDate = new Date();
                        expiresDate.setTime(expiresIn);
                        if (expiresDate > new Date()) {
                            resolve(true);
                        }
                        else {
                            localStorage.removeItem('idToken');
                            localStorage.removeItem('expiresIn');
                            resolve(false);
                        }
                    }
                    else {
                        localStorage.removeItem('idToken');
                        localStorage.removeItem('expiresIn');
                        resolve(false);
                    }
                }, function (err) {
                    localStorage.removeItem('idToken');
                    localStorage.removeItem('expiresIn');
                    resolve(false);
                });
            }
            else {
                localStorage.removeItem('idToken');
                localStorage.removeItem('expiresIn');
                resolve(false);
            }
        });
    };
    /*=============================================
    Resetear la contraseña
    =============================================*/
    UsersService.prototype.sendPasswordResetEmailFnc = function (body) {
        return this.http.post("" + this.sendPasswordResetEmail, body);
    };
    /*=============================================
    Confirmar el cambio de la contraseña
    =============================================*/
    UsersService.prototype.verifyPasswordResetCodeFnc = function (body) {
        return this.http.post("" + this.verifyPasswordResetCode, body);
    };
    /*=============================================
    Enviar la contraseña
    =============================================*/
    UsersService.prototype.confirmPasswordResetFnc = function (body) {
        return this.http.post("" + this.confirmPasswordReset, body);
    };
    /*=============================================
    Cambiar la contraseña
    =============================================*/
    UsersService.prototype.changePasswordFnc = function (body) {
        return this.http.post("" + this.changePassword, body);
    };
    /*=============================================
      Tomar información de un solo usuario
      =============================================*/
    UsersService.prototype.getUniqueData = function (value) {
        return this.http.get(this.api + "users/" + value + ".json");
    };
    /*=============================================
    Función para agregar productos a la lista de deseos
    =============================================*/
    UsersService.prototype.addWishlist = function (product) {
        /*=============================================
        Validamos que el usuario esté autenticado
        =============================================*/
        var _this = this;
        this.authActivate().then(function (resp) {
            if (!resp) {
                funciones_1.Sweetalert.fnc("error", "The user must be logged in", null);
                return;
            }
            else {
                /*=============================================
                Traemos la lista de deseos que ya tenga el usuario
                =============================================*/
                _this.getFilterData("idToken", localStorage.getItem("idToken"))
                    .subscribe(function (resp) {
                    /*=============================================
                    Capturamos el id del usuario
                    =============================================*/
                    var id = Object.keys(resp).toString();
                    var _loop_1 = function (i) {
                        /*=============================================
                        Pregutnamos si existe una lista de deseos
                        =============================================*/
                        if (resp[i].wishlist != undefined) {
                            var wishlist = JSON.parse(resp[i].wishlist);
                            var length_1 = 0;
                            /*=============================================
                            Pregutnamos si existe un producto en la lista de deseos
                            =============================================*/
                            if (wishlist.length > 0) {
                                wishlist.forEach(function (list, index) {
                                    if (list == product) {
                                        length_1--;
                                    }
                                    else {
                                        length_1++;
                                    }
                                });
                                /*=============================================
                                Preguntamos si no ha agregado este producto a la lista de deseos anteriormente
                                =============================================*/
                                if (length_1 != wishlist.length) {
                                    funciones_1.Sweetalert.fnc("error", "It already exists on your wishlist", null);
                                }
                                else {
                                    wishlist.push(product);
                                    var body = {
                                        wishlist: JSON.stringify(wishlist)
                                    };
                                    _this.patchData(id, body)
                                        .subscribe(function (resp) {
                                        if (resp["wishlist"] != "") {
                                            var totalWishlist = Number($(".totalWishlist").html());
                                            $(".totalWishlist").html(totalWishlist + 1);
                                            funciones_1.Sweetalert.fnc("success", "Product added to wishlist", null);
                                        }
                                    });
                                }
                            }
                            else {
                                wishlist.push(product);
                                var body = {
                                    wishlist: JSON.stringify(wishlist)
                                };
                                _this.patchData(id, body)
                                    .subscribe(function (resp) {
                                    if (resp["wishlist"] != "") {
                                        var totalWishlist = Number($(".totalWishlist").html());
                                        $(".totalWishlist").html(totalWishlist + 1);
                                        funciones_1.Sweetalert.fnc("success", "Product added to wishlist", null);
                                    }
                                });
                            }
                            /*=============================================
                            Cuando no exista lista de deseos inicialmente
                            =============================================*/
                        }
                        else {
                            var body = {
                                wishlist: "[\"" + product + "\"]"
                            };
                            _this.patchData(id, body)
                                .subscribe(function (resp) {
                                if (resp["wishlist"] != "") {
                                    var totalWishlist = Number($(".totalWishlist").html());
                                    $(".totalWishlist").html(totalWishlist + 1);
                                    funciones_1.Sweetalert.fnc("success", "Product added to wishlist", null);
                                }
                            });
                        }
                    };
                    for (var i in resp) {
                        _loop_1(i);
                    }
                });
            }
        });
    };
    /*=============================================
  Función para agregar productos al carrito de compras
  =============================================*/
    UsersService.prototype.addSoppingCart = function (item) {
        /*=============================================
        Filtramos el producto en la data
        =============================================*/
        this.productsService.getFilterData("url", item["product"])
            .subscribe(function (resp) {
            /*=============================================
            Recorremos el producto para encontrar su información
            =============================================*/
            for (var i in resp) {
                /*=============================================
                Preguntamos primero que el producto tenga stock
                =============================================*/
                if (resp[i]["stock"] == 0) {
                    funciones_1.Sweetalert.fnc("error", "Out of Stock", null);
                    return;
                }
                /*=============================================
                Preguntamos si el item detalles viene vacío
                =============================================*/
                if (item["details"].length == 0) {
                    if (resp[i].specification != "") {
                        var specification = JSON.parse(resp[i].specification);
                        item["details"] = "[{";
                        for (var i_1 in specification) {
                            var property = Object.keys(specification[i_1]).toString();
                            item["details"] += "\"" + property + "\":\"" + specification[i_1][property][0] + "\",";
                        }
                        item["details"] = item["details"].slice(0, -1);
                        item["details"] += "}]";
                    }
                }
            }
        });
        /*=============================================
        Agregamos al LocalStorage la variable listado carrito de compras
        =============================================*/
        if (localStorage.getItem("list")) {
            var arrayList = JSON.parse(localStorage.getItem("list"));
            /*=============================================
            Preguntar si el producto se repite
            =============================================*/
            var count = 0;
            var index = void 0;
            for (var i in arrayList) {
                if (arrayList[i].product == item["product"] &&
                    arrayList[i].details.toString() == item["details"].toString()) {
                    count--;
                    index = i;
                }
                else {
                    count++;
                }
            }
            /*=============================================
            Validamos si el producto se repite
            =============================================*/
            if (count == arrayList.length) {
                arrayList.push(item);
            }
            else {
                arrayList[index].unit += item["unit"];
            }
            localStorage.setItem("list", JSON.stringify(arrayList));
            funciones_1.Sweetalert.fnc("success", "Product added to Shopping Cart", item["url"]);
        }
        else {
            var arrayList = [];
            arrayList.push(item);
            localStorage.setItem("list", JSON.stringify(arrayList));
            funciones_1.Sweetalert.fnc("success", "Product added to Shopping Cart", item["url"]);
        }
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
