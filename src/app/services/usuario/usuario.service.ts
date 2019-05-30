import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token); // Aquí habría que llamar a toda la función de guardarStorage (buenas prácticas).
      console.log('Token renovado');
      return true;
    })).pipe(
      catchError(err => of([
        Swal.fire('No se pudo renovar el token', 'No fue posible renovar el token', 'error'),
        this.router.navigate(['/login'])
      ]))
    );
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }));
  }

  login(usuario: Usuario, recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    })).pipe(
      catchError(err => of([
        Swal.fire('Error en el Login', err.error.status, 'error')
      ]))
    );
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(map((resp:any) => {
      Swal.fire('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    })).pipe(
      catchError(err => of([
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error')
      ]))
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    // Se añade el token a la url como parámetro (url?token=...)
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map( (resp: any) => {
      if (usuario._id === this.usuario._id) {
        let usuarioResp: Usuario = resp.usuario;
        this.guardarStorage(usuarioResp._id, this.token, usuarioResp, this.menu);
      }
      Swal.fire('Usuario actualizado!', usuario.nombre, 'success');
      return true;
    })).pipe(
      catchError(err => of([
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error')
      ]))
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
            .then((resp: any) => {
              this.usuario.img = resp.usuario.img;
              Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
              this.guardarStorage(id, this.token, this.usuario, this.menu);
            })
            .catch(resp => {
              console.log(resp);
            });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(map( resp => {
      Swal.fire('Usuario eliminado!', 'El usuario ha sido eliminado.', 'success');
      return true;
    }));
  }
}
