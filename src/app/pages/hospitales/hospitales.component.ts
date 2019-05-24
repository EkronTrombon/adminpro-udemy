import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  totalHospitales: number;
  cargando: boolean = true;
  actualizar: boolean = false;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) {
    this.cargando = true;
  }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe(/*No hay que hacer nada en la respuesta*/);
  }

  borrarHospital(hospital: Hospital) {
    // Preguntamos al usuario si realmente está seguro de que quiere borrar el hospital.
    Swal.fire({
      title: 'Está seguro?',
      text: 'Los hospitales borrados no se pueden recuperar!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital._id).subscribe( borrado => {
          this.cargarHospitales();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El hospital no se ha borrado', 'error');
      }
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  async crearHospital() {
    const {value: nombre} = await Swal.fire({
      title: 'Nuevo nombre del Hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital'
    });
    if (!nombre) {
      Swal.fire('El nombre es obligatorio!', 'Introduce el nuevo nombre del hospital', 'error');
      return;
    }
    this.hospitalService.crearHospital(nombre).subscribe(() => this.cargarHospitales());
  }

  actualizarImagen(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
