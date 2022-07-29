import { SolicitudAdminComponent } from './../components/solicitud-admin/solicitud-admin.component';
import { EditarUsuarioComponent } from './../components/Usuarios/editar/editarUsuario.component';
import { RegistrarUsuarioComponent } from './../components/Usuarios/registrar/registrarUsuario.component';
import { UsuariosComponent } from './../components/Usuarios/usuarios.component';
import { EditarComponent } from './../components/Departamentos/Registrar/editar/editar.component';
import { DepartamentosComponent } from './../components/Departamentos/departamentos.component';
import { AuthGuard } from './../guards/auth.guard';
import {Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReportesComponent } from '../components/Reportes/reportes.component';
import { SolicitudesComponent } from '../components/Solicitudes/solicitudes.component';

import { RegistrarComponent } from '../components/Departamentos/Registrar/registrar/registrar.component';
import { EditarSolicitudComponent } from '../components/Solicitudes/editarSolicitud/editarSolicitud.component';

const routes: Routes =[
   {path: 'dashboard',
   
   component: PagesComponent,
   canActivate: [AuthGuard],
   children: [
        {path: 'reportes', component: ReportesComponent},
        {path: 'solicitudes', component: SolicitudesComponent},
        {path: 'departamentos', component: DepartamentosComponent},

        {path: 'registrarDepartamentos', component: RegistrarComponent},
        {path: 'actualizarDepartamento/:id', component: EditarComponent},

        {path: 'usuarios', component: UsuariosComponent},

        {path: 'registrarUsuarios', component:RegistrarUsuarioComponent},
        {path: 'actualizarUsuarios/:id', component: EditarUsuarioComponent},
        {path: 'actualizarSolicitud', component: EditarSolicitudComponent},

        {path: 'solicitudAdmin', component:SolicitudAdminComponent}
   ]
}
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule],
})
export class PagesRoutingModule{}