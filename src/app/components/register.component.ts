import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersModel } from '../models/users.model';


import { UsersService } from '../services/users.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-register',
  templateUrl: '../pages/register.component.html',
  styleUrls: ['../styles/register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UsersModel;

  constructor(private usersService: UsersService) {
    
    this.user = new UsersModel();
  }

  ngOnInit(): void {

    /*=============================================
    Validar formulario de Bootstrap 4
    =============================================*/

    // Disable form submissions if there are invalid fields
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
    
  }

  /*=============================================
  Envío del formulario
  =============================================*/

  onSubmit(f: NgForm) {

    this.user.returnSecureToken = true;
    this.usersService.registerAuth(this.user)
      .subscribe(resp => {

      if (resp["email"] == this.user.email) {

        /*=============================================
        Registro en Firebase Database
        =============================================*/

        this.user.displayName = `${this.user.first_name} ${this.user.last_name}`;
        this.user.method = "direct";
        this.user.idToken = resp["idToken"];
        this.user.needConfirm = false;
        //this.user.username = this.user.username.toLowerCase();

        this.usersService.registerDatabase(this.user)
          .subscribe(resp => {

            //Sweetalert.fnc("success", "Confirm your account in your email (check spam)", "login")
          
          })

        }

    })

  }
}
