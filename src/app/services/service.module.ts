import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, 
         SidebarService, 
         SharedService, 
         UsuarioService, 
         LoginGuardGuard, 
         SubirArchivoService } from 'src/app/services/service.index';
import { HttpClientModule } from '@angular/common/http';

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
    LoginGuardGuard
  ]
})
export class ServiceModule { }
