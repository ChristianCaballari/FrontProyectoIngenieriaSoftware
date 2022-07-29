import { ArchivoSolicitudService } from './../../services/archivoSolicitud.service';
import { SolicitudesAdminService } from './../../services/solicitudesAdmin.service';
import { SolicitudService } from './../../services/solicitud.service';
import { SolicitudDetalles } from './../../interfaces/Solicitud.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import fileDownload from 'js-file-download'
import { base64StringToBlob } from 'blob-util';

@Component({
  selector: 'app-solicitud-admin',
  templateUrl: './solicitud-admin.component.html',
  styleUrls: ['./solicitud-admin.component.css']
})
export class SolicitudAdminComponent implements OnInit {
  @ViewChild('botonAbrir') botonAbrir!: ElementRef;
  solicitudes :any[];
  

  public solicitudRespuestaForm = this.fbuilder.group({
    idUsuarioRespuesta: ['', [Validators.required]],
    detalleRespuesta: ['', [Validators.required]],
    idSolicitud: ['', [Validators.required]],
    idUsuario: ['', [Validators.required]],
    idRespuestaLegal:['', [Validators.required]],
  });

  constructor(private solicitudesAdminService: SolicitudesAdminService,
    private solicitudService: SolicitudService,
    private fbuilder: FormBuilder,
    private toastrService: ToastrService,
    private archivoSolicitudService:ArchivoSolicitudService) { 
    this.cargarSolicitudes();
  }

  ngOnInit(): void {
  }

  cargarSolicitudes(){
    this.solicitudesAdminService.getSolicitudesAdmin().subscribe((resp:any) =>{
     this.solicitudes = resp.msg;
     console.log(this.solicitudes);
    })
  }
  solicitudesPersonales: any = [];
  getSolicitudes(idEncargado :any) {
    this.solicitudService.getSolicitudes(idEncargado).subscribe((resp: any) => {
      this.solicitudesPersonales = resp.msg;
      console.log(this.solicitudesPersonales);
    });
  }
  showChat(solicitud){
   this.getSolicitudes(solicitud.idUsuario)
  }

  agregarRespuesta(){
    console.log(this.solicitudRespuestaForm.value);
    if(this.solicitudRespuestaForm.valid){
      //Insertar db
      this.solicitudesAdminService.updatedSolicitud(this.solicitudRespuestaForm.value).subscribe((resp:any)=>{
        this.toastrService.success(resp.msg);
        this.cargarSolicitudes();
       this.getSolicitudes(this.solicitudRespuestaForm.value.idUsuario);
       this.cerrarModal();
      })
      this.cerrarModal();
    }else{
      this.toastrService.warning('Ingrese el asunto detallado');
    }
  }
   
  agregarDatosInputHidden(solicitud:any){
   console.log(solicitud);
    this.solicitudRespuestaForm.setValue({
      idUsuarioRespuesta: sessionStorage.getItem('idUsuario'),
      detalleRespuesta:'',
      idSolicitud: solicitud.idSolicitud,
      idUsuario: solicitud.idUsuario,
      idRespuestaLegal: solicitud.idRespuestaLegal
    });
  }

  solicitudDetalles: SolicitudDetalles = {
    apellidos:'',
    nombre:'',
    idSolicitud:'',
    idUsuario:'',
    foto:'',
    fechaHora:'',
    descripcion:'',
    destalleRespuesta:'',
    asuntoDetallado:''
}
archivosSolicitudes: any[];
  VerDetalles(solicitud:any){
    console.log(solicitud);
     this.solicitudDetalles = solicitud;
     this.archivoSolicitudService.getArchivoSolitudID(solicitud.idSolicitud).subscribe((resp:any)=>{
      console.log(resp.msg);
       this.archivosSolicitudes = resp.msg;
       this.getCantidadCambios(solicitud.idSolicitud);
     });
  }
  descargar(archivo:any){
    console.log(archivo);
    this.archivoSolicitudService.getArchivoSolitudDowload(archivo).subscribe((resp:any)=>{
       console.log(resp.msg);

       const { archivo, tipo, nombre } = resp.msg[0];
       // var decodedData = window.atob(base64)
      const blob = base64StringToBlob(archivo.split(',')[1]);
       fileDownload(blob, `${nombre}.${tipo}`);
    })
    //alert(archivo.nombre);
  }
  cambiosSolicitud: any[];
  getCantidadCambios(idSolicitud:any){
    this.solicitudesAdminService.getCambiosSolicitud(idSolicitud).subscribe((resp:any)=>{
       console.log(resp);
        this.cambiosSolicitud =resp. msg;
    });
  }
  cerrarModal() {
    this.botonAbrir.nativeElement.click();
  }
}
