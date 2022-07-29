import { RegistrarUsuarioComponent } from './Usuarios/registrar/registrarUsuario.component';
import { EditarUsuarioComponent } from './Usuarios/editar/editarUsuario.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarComponent } from './Departamentos/Registrar/registrar/registrar.component';
import { EditarComponent } from './Departamentos/Registrar/editar/editar.component';
import { UsuariosComponent } from './Usuarios/usuarios.component';
import { SolicitudesComponent } from './Solicitudes/solicitudes.component';
import { EditarSolicitudComponent } from './Solicitudes/editarSolicitud/editarSolicitud.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
     declarations: [
        RegistrarComponent,
        EditarComponent,
        UsuariosComponent,
        EditarUsuarioComponent,
        RegistrarUsuarioComponent,
        RegistrarComponent,
        EditarSolicitudComponent,
  ],
     exports:[
      RegistrarComponent,
      NgxDropzoneModule
      
     ],
     imports: [
       CommonModule,
       FormsModule,  
       ReactiveFormsModule,
       
     ]
   })
   export class ComponentsModule { }