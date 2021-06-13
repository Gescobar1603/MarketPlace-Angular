"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountProfileComponent = void 0;
var core_1 = require("@angular/core");
var funciones_1 = require("../funciones");
var config_1 = require("../config");
var AccountProfileComponent = /** @class */ (function () {
    function AccountProfileComponent(usersService, http) {
        this.usersService = usersService;
        this.http = http;
        this.path = config_1.Path.url;
        this.vendor = false;
        this.method = false;
        this.preload = false;
        this.server = config_1.Server.url;
        this.image = null;
    }
    AccountProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.preload = true;
        /*=============================================
        Validar si existe usuario autenticado
        =============================================*/
        this.usersService.authActivate().then(function (resp) {
            if (resp) {
                _this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
                    .subscribe(function (resp) {
                    _this.id = Object.keys(resp).toString();
                    for (var i in resp) {
                        /*=============================================
                        Preguntamos si es vendedor
                        =============================================*/
                        if (resp[i].vendor != undefined) {
                            _this.vendor = true;
                        }
                        /*=============================================
                        Asignamos nombre completo del usuario
                        =============================================*/
                        _this.displayName = resp[i].displayName;
                        /*=============================================
                        Asignamos username
                        =============================================*/
                        _this.username = resp[i].username;
                        /*=============================================
                        Asignamos email
                        =============================================*/
                        _this.email = resp[i].email;
                        /*=============================================
                        Asignamos foto del usuario
                        =============================================*/
                        if (resp[i].picture != undefined) {
                            if (resp[i].method != "direct") {
                                _this.picture = resp[i].picture;
                            }
                            else {
                                _this.picture = "assets/img/users/" + resp[i].username.toLowerCase() + "/" + resp[i].picture;
                            }
                        }
                        else {
                            _this.picture = "assets/img/users/default/default.png";
                        }
                        /*=============================================
                        Método de registro
                        =============================================*/
                        if (resp[i].method != "direct") {
                            _this.method = true;
                        }
                        _this.preload = false;
                    }
                });
            }
        });
        /*=============================================
        Función para ejecutar el Tooltip de Bootstrap 4
        =============================================*/
        funciones_1.Tooltip.fnc();
        /*=============================================
        Validar formulario de Bootstrap 4
        =============================================*/
        // Disable form submissions if there are invalid fields
        (function () {
            'use strict';
            window.addEventListener('load', function () {
                // Get the forms we want to add validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();
        /*=============================================
        Script para subir imagen con el input de boostrap
        =============================================*/
        // Add the following code if you want the name of the file appear on select
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    };
    /*=============================================
    Validación de expresión regular del formulario
    =============================================*/
    AccountProfileComponent.prototype.validate = function (input) {
        var pattern;
        if ($(input).attr("name") == "password") {
            pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
        }
        if (!pattern.test(input.value)) {
            $(input).parent().addClass('was-validated');
            input.value = "";
        }
    };
    /*=============================================
    Enviar nueva Contraseña
    =============================================*/
    AccountProfileComponent.prototype.newPassword = function (value) {
        var _this = this;
        if (value != "") {
            funciones_1.Sweetalert.fnc("loading", "Loading...", null);
            var body = {
                idToken: localStorage.getItem('idToken'),
                password: value,
                returnSecureToken: true
            };
            this.usersService.changePasswordFnc(body)
                .subscribe(function (resp1) {
                var value = {
                    idToken: resp1["idToken"]
                };
                _this.usersService.patchData(_this.id, value)
                    .subscribe(function (resp2) {
                    /*=============================================
                    Almacenamos el Token de seguridad en el localstorage
                    =============================================*/
                    localStorage.setItem("idToken", resp1["idToken"]);
                    /*=============================================
                    Almacenamos la fecha de expiración localstorage
                    =============================================*/
                    var today = new Date();
                    today.setSeconds(resp1["expiresIn"]);
                    localStorage.setItem("expiresIn", today.getTime().toString());
                    funciones_1.Sweetalert.fnc("success", "Password change successful", "account");
                });
            }, function (err) {
                funciones_1.Sweetalert.fnc("error", err.error.error.message, null);
            });
        }
    };
    /*=============================================
    Validar Imagen
    =============================================*/
    AccountProfileComponent.prototype.validateImage = function (e) {
        this.image = e.target.files[0];
        /*=============================================
        Validamos el formato
        =============================================*/
        if (this.image["type"] !== "image/jpeg" && this.image["type"] !== "image/png") {
            funciones_1.Sweetalert.fnc("error", "The image must be in JPG or PNG format", null);
            return;
        }
        /*=============================================
        Validamos el tamaño
        =============================================*/
        else if (this.image["size"] > 2000000) {
            funciones_1.Sweetalert.fnc("error", "Image must not weigh more than 2MB", null);
            return;
        }
        /*=============================================
        Mostramos la imagen temporal
        =============================================*/
        else {
            var data = new FileReader();
            data.readAsDataURL(this.image);
            $(data).on("load", function (event) {
                var path = event.target.result;
                $(".changePicture").attr("src", path);
            });
        }
    };
    /*=============================================
    Subir imagen al servidor
    =============================================*/
    AccountProfileComponent.prototype.uploadImage = function () {
        var _this = this;
        var formData = new FormData();
        formData.append('file', this.image);
        formData.append('folder', this.username);
        formData.append('path', 'users');
        formData.append('width', '200');
        formData.append('height', '200');
        this.http.post(this.server, formData)
            .subscribe(function (resp) {
            if (resp["status"] == 200) {
                var body = {
                    picture: resp["result"]
                };
                _this.usersService.patchData(_this.id, body)
                    .subscribe(function (resp) {
                    if (resp["picture"] != "") {
                        funciones_1.Sweetalert.fnc("success", "¡Your photo has been updated!", "account");
                    }
                });
            }
        });
    };
    AccountProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-account-profile',
            templateUrl: '../pages/account-profile.component.html',
            styleUrls: ['../styles/account-profile.component.css']
        })
    ], AccountProfileComponent);
    return AccountProfileComponent;
}());
exports.AccountProfileComponent = AccountProfileComponent;
