import { GraficaUsuariosComponent } from './../components/Reportes/GraficaUsuarios/GraficaUsuarios.component';
import { DepartamentosComponent } from './../components/Departamentos/departamentos.component';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { ReportesComponent } from '../components/Reportes/reportes.component';
import { SolicitudesComponent } from '../components/Solicitudes/solicitudes.component';
import { SharedModule } from '../shared/shared.module';
import { GraficaClasificador } from '../components/Reportes/GraficaClaficador/graficaClasificador.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PagesComponent,
    ReportesComponent,
    SolicitudesComponent,
    DepartamentosComponent,
    GraficaClasificador,
    GraficaUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,ReactiveFormsModule,
    NgChartsModule
    
  ]
})
export class PagesModule { }
