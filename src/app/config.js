/*============================================================
EXPORTAMOS LA RUTA PARA TOMAR IMAGENES
=============================================================*/

export let Path = {

    url: 'http://localhost:4200/assets/'

    //CENTIFICADO SSL

    //url: 'https://localhost:4200/assets/'

}

/*============================================================
EXPORTAMOS LA RUTA PARA TOMAR IMAGENES
=============================================================*/

export let Api = {

    url: 'https://marketplace01-36d03-default-rtdb.firebaseio.com/'

}

/*=============================================
Exportamos el endPoint para el registro de usuarios en Firebase Authentication
=============================================*/

export let Register = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
}

/*=============================================
Exportamos el endPoint para el ingreso de usuarios en Firebase Authentication
=============================================*/

export let Login = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
}


/*=============================================
Exportamos el endPoint para enviar verificación de correo electrónico
=============================================*/

export let SendEmailVerification = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'

}

/*=============================================
Exportamos el endPoint para confirmar email de verificación
=============================================*/

export let ConfirmEmailVerification = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'

}


/*=============================================
Exportamos el endPoint para tomar la data del usuario en Firebase auth
=============================================*/

export let GetUserData = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'

}

/*=============================================
Exportamos el endPoint para Resetear la contraseña
=============================================*/

export let SendPasswordResetEmail = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'

}

/*=============================================
Exportamos el endPoint para confirmar el cambio de la contraseña
=============================================*/

export let VerifyPasswordResetCode = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'

}

/*=============================================
Exportamos el endPoint para enviar la contraseña
=============================================*/

export let ConfirmPasswordReset = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'

}

/*=============================================
Exportamos el endPoint para cambiar la contraseña
=============================================*/

export let ChangePassword = {

    url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkjhYlJKmyNSTdnfVBA8eZgXtUJNqbRK8'
}