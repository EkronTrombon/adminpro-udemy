import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedicos(termino).subscribe((medicos: Medico[]) => this.medicos = medicos);
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico) {
    this.medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
  }

}
