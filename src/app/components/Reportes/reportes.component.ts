import { ClasificadorService } from './../../services/clasificador.service';
import { GraficaService } from './../../services/graficas.service';
import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent   {
@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    repuestaLegales:number[] = [];
    repuestaEtiquetas:string[] = [];

    repuestaClasificador:number[] = [];
    etiquetasClasificadorEtiquetas:string[] = [];
   constructor(private graficaService:GraficaService, private clasificadorService:ClasificadorService ){
 
   }
  numb:number =0;

  cargarRespuestaLegales(){
    this.graficaService.getCantidadRespuestaLegal().subscribe((resp:any)=>{
  
      this.repuestaLegales.push(resp.msg[0].Cantidad)
      this.repuestaLegales.push(resp.msg[1].Cantidad)
      this.repuestaLegales.push(resp.msg[2].Cantidad)
      this.repuestaEtiquetas.push(resp.msg[0].descripcion +' '+resp.msg[0].Cantidad);
      this.repuestaEtiquetas.push(resp.msg[1].descripcion +' '+resp.msg[1].Cantidad);
      this.repuestaEtiquetas.push(resp.msg[2].descripcion +' '+resp.msg[2].Cantidad);
      this.pieChartData.labels = this.repuestaEtiquetas;
      //this.chart.render();
      this.chart?.update();
     
     
    })
   }

   ngOnInit(): void {
    this.cargarRespuestaLegales()
    //this.pieChartData.labels = this.repuestaEtiquetas;
   // this.getCantidadSolictudPorClasificador();
  }
   // Pie

   mostrar(){
    console.log(this.repuestaEtiquetas);
   }
   public pieChartOptions: ChartConfiguration['options'] = {
     responsive: true,
     plugins: {
       legend: {
         display: true,
         position: 'top',
       },
       datalabels: {
         formatter: (value, ctx) => {
           if (ctx.chart.data.labels) {
             return ctx.chart.data.labels[ctx.dataIndex];
           }
         }, 
       },
     }
   };
   public pieChartData: ChartData<'pie', number[], string | string[]> = {
     labels: [[String(this.repuestaEtiquetas[0])],[String(this.repuestaEtiquetas[1])]],
     datasets: [ {
       data: this.repuestaLegales as [],
       
     } ]
   };
   public pieChartType: ChartType = 'pie';
   public pieChartPlugins = [ DatalabelsPlugin ];
 
   downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData1');
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.text('Reportes Proyectos', 180,20);
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        const bufferX = 20;
        const bufferY = 20;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2* bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`Reporte_Proyectos`);
      });
  }

  downloadPDF2() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData2');
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.text('Reportes Proyectos', 180,20);
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        const bufferX = 20;
        const bufferY = 20;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2* bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`Reporte_Proyectos`);
      });
  }
 

}
