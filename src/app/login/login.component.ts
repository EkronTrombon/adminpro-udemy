import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    // Llamamos a la función que genera el login de Google.
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // Función que genera el login de Google (Documentación oficial de Google API).
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '606321368262-m8ef0q5ibbhkfmipkhtci79gj12eun8b.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(correcto => window.location.href = '#/dashboard');
    });
  }

  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    let usuario = new Usuario(null, formulario.value.email, formulario.value.password);
    this.usuarioService.login(usuario, formulario.value.recuerdame).subscribe(correcto => this.router.navigate(['/dashboard']));
  }

}
