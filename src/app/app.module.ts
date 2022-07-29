import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { DepartamentosComponent } from './Departamentos/departamentos/departamentos.component';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SolicitudAdminComponent } from './components/solicitud-admin/solicitud-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SolicitudAdminComponent,
//    DepartamentosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    DataTablesModule,
    FormsModule,ReactiveFormsModule,
    
   // required animations module
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgxDropzoneModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
