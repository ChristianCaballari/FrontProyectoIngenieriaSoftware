import { ClasificadorService } from './../../../services/clasificador.service';

import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-graficaClasificador',
  templateUrl: './graficaClasificador.component.html',
  styleUrls: ['./graficaClasificador.component.css']
})

export class GraficaClasificador  {
@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    repuestaClasificador:number[] = [];
    etiquetasClasificadorEtiquetas:string[] = [];
   constructor(private clasificadorService:ClasificadorService ){
 
   }
  numb:number =0;

  getCantidadSolictudPorClasificador(){
    this.clasificadorService.getCantidadSolictudPorClasificador().subscribe((resp:any)=>{
      console.log(resp.msg);
       this.repuestaClasificador.push(resp.msg[0].Cantidad)
      this.repuestaClasificador.push(resp.msg[1].Cantidad)
      this.repuestaClasificador.push(resp.msg[2].Cantidad)
      this.etiquetasClasificadorEtiquetas.push(resp.msg[0].descripcion +' '+resp.msg[0].Cantidad);
      this.etiquetasClasificadorEtiquetas.push(resp.msg[1].descripcion +' '+resp.msg[1].Cantidad);
      this.etiquetasClasificadorEtiquetas.push(resp.msg[2].descripcion +' '+resp.msg[2].Cantidad);
      this.doughnutChartData.labels = this.etiquetasClasificadorEtiquetas;
      //this.chart.render();
      this.chart?.update();
    })
   }

 
   ngOnInit(): void {
    //this.pieChartData.labels = this.repuestaEtiquetas;
    this.getCantidadSolictudPorClasificador();
  }

   public pieChartType: ChartType = 'pie';
   public pieChartPlugins = [ DatalabelsPlugin ];
   public doughnutChartLabels: string[] = this.etiquetasClasificadorEtiquetas;
   public doughnutChartData: ChartData<'doughnut'> = {
     labels: this.doughnutChartLabels,
     datasets: [
       { data: this.repuestaClasificador}
     ]
   };
   public doughnutChartType: ChartType = 'doughnut';
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
        const bufferX = 30;
        const bufferY = 30;
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
