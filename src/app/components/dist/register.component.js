"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var users_model_1 = require("../models/users.model");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(usersService) {
        this.usersService = usersService;
        this.user = new users_model_1.UsersModel();
    }
    RegisterComponent.prototype.ngOnInit = function () {
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
    };
    /*=============================================
    Envío del formulario
    =============================================*/
    RegisterComponent.prototype.onSubmit = function (f) {
        var _this = this;
        this.user.returnSecureToken = true;
        this.usersService.registerAuth(this.user)
            .subscribe(function (resp) {
            if (resp["email"] == _this.user.email) {
                /*=============================================
                Registro en Firebase Database
                =============================================*/
                _this.user.displayName = _this.user.first_name + " " + _this.user.last_name;
                _this.user.method = "direct";
                _this.user.idToken = resp["idToken"];
                _this.user.needConfirm = false;
                //this.user.username = this.user.username.toLowerCase();
                _this.usersService.registerDatabase(_this.user)
                    .subscribe(function (resp) {
                    //Sweetalert.fnc("success", "Confirm your account in your email (check spam)", "login")
                });
            }
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: '../pages/register.component.html',
            styleUrls: ['../styles/register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
