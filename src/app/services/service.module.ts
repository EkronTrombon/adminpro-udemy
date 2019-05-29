import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, 
         SidebarService, 
         SharedService, 
         UsuarioService, 
         HospitalService,
         MedicoService,
         LoginGuardGuard,
         AdminGuard,
         SubirArchivoService } from 'src/app/services/service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Services

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard
  ]
})
export class ServiceModule { }
