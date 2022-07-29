import { PaisesService } from './../../../services/paises.service';
import { GraficaService } from './../../../services/graficas.service';
import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-graficaUsuariosComponent',
  templateUrl: './GraficaUsuarios.component.html',
  styleUrls: ['./GraficaUsuarios.component.css']
})

export class GraficaUsuariosComponent   {
@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    repuestaNum:number[] = [];
    fechasEtiquetas:string[] = [];

    repuestaClasificador:number[] = [];
    etiquetasClasificadorEtiquetas:string[] = [];
   constructor(private graficaService:GraficaService, private paisesService:PaisesService){
 
   }
  numb:number =0;

  cargarRespuestaLegales(){
    this.paisesService.getDatoUsuarioGrafica().subscribe((resp:any)=>{
      resp.msg.forEach(element => {
        this.fechasEtiquetas.push(element.nombre.trim() +"|"+element.Departamento+"|"+element.Clasificador);
        this.repuestaNum.push(element.Pendiente);
      });
    })
   // this.chart.update();
   this.chart?.render();
   }

   ngOnInit(): void {
    this.cargarRespuestaLegales();
   
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: -1,
        max:5
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.fechasEtiquetas,
    datasets: [
      { data: this.repuestaNum, label: 'Pendiente de Respuesta' },
    ]
  };
  

 

 

}
