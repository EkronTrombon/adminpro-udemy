import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor( public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    // Sólo permitimos el cambio de email si el usuario NO está logueado por Google
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(resp => {
      console.log(resp);
    });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      console.log('El archivo no es una imagen!'); // Mensaje de swal: El archivo no es una imagen.
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    // Mostrar el preview de la imagen (Hecho con Vanilla JavaScript puro).
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    // Lanzamos la función desde el USUARIOSERVICE!
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
