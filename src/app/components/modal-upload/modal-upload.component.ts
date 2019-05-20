import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemp: any;

  constructor(public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
              .then(resp => {
                console.log(resp);
                this.modalUploadService.notificacion.emit(resp);
                this.cerrarModal();
              })
              .catch(resp => {
                console.log('Error en la carga');
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

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

}
