import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard, AdminGuard } from '../services/service.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
        { path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Dashboard', name: 'description', content: 'Dashboard'} },
        { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress', name: 'description', content: 'Progress'} },
        { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas', name: 'description', content: 'Gráficas'} },
        { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas', name: 'description', content: 'Promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables (RxJs)', name: 'description', content: 'Observables (RxJs)'} },
        { path: 'account-settings', component: AccountSettingComponent, data: {titulo: 'Ajustes', name: 'description', content: 'Ajustes'} },
        { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
        { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
        // Mantenimiento
        { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: {titulo: 'Mantenimientos de usuarios'},  },
        { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimientos de hospitales'} },
        { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimientos de médicos'} },
        { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar médico'} },
        { path: '', redirectTo: '/dashboard' , pathMatch: 'full' }
    ]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);