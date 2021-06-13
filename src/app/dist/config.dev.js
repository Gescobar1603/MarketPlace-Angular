"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = exports.ChangePassword = exports.ConfirmPasswordReset = exports.VerifyPasswordResetCode = exports.SendPasswordResetEmail = exports.GetUserData = exports.ConfirmEmailVerification = exports.SendEmailVerification = exports.Login = exports.Register = exports.Api = exports.Path = void 0;

/*============================================================
EXPORTAMOS LA RUTA PARA TOMAR IMAGENES
=============================================================*/
var Path = {
  url: 'http://localhost:4200/assets/' //CENTIFICADO SSL
  //url: 'https://localhost:4200/assets/'

};
/*============================================================
EXPORTAMOS LA RUTA PARA TOMAR IMAGENES
=============================================================*/

exports.Path = Path;
var Api = {
  url: 'https://marketplace01-36d03-default-rtdb.firebaseio.com/'
};
/*=============================================
Exportamos el endPoint para el registro de usuarios en Firebase Authentication
=============================================*/

exports.Api = Api;
var Register = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para el ingreso de usuarios en Firebase Authentication
=============================================*/

exports.Register = Register;
var Login = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para enviar verificación de correo electrónico
=============================================*/

exports.Login = Login;
var SendEmailVerification = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para confirmar email de verificación
=============================================*/

exports.SendEmailVerification = SendEmailVerification;
var ConfirmEmailVerification = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para tomar la data del usuario en Firebase auth
=============================================*/

exports.ConfirmEmailVerification = ConfirmEmailVerification;
var GetUserData = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para Resetear la contraseña
=============================================*/

exports.GetUserData = GetUserData;
var SendPasswordResetEmail = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para confirmar el cambio de la contraseña
=============================================*/

exports.SendPasswordResetEmail = SendPasswordResetEmail;
var VerifyPasswordResetCode = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para enviar la contraseña
=============================================*/

exports.VerifyPasswordResetCode = VerifyPasswordResetCode;
var ConfirmPasswordReset = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint para cambiar la contraseña
=============================================*/

exports.ConfirmPasswordReset = ConfirmPasswordReset;
var ChangePassword = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
/*=============================================
Exportamos el endPoint del servidor para administrar archivos
=============================================*/

exports.ChangePassword = ChangePassword;
var Server = {
  url: 'http://localhost/MarketPlace-Angular/src/assets/img/index.php?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
};
exports.Server = Server;