import { SolicitudesAdminService } from './../../services/solicitudesAdmin.service';
import { SolicitudService } from './../../services/solicitud.service';
import { ClasificadorService } from './../../services/clasificador.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Archivo } from '../../interfaces/Archivo.interface';
import { Solicitud } from '../../interfaces/Solicitud.interface';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
})
export class SolicitudesComponent implements OnInit {
  @ViewChild('botonCerraModal') botonCerraModal!: ElementRef;
  @ViewChild('botonAbrir') botonAbrir!: ElementRef;
  @ViewChild('cerrarModalInsertar') cerrarModalInsertar!: ElementRef;

  @ViewChild('botonAbrirDropzone') botonAbrirDropzone!: ElementRef;

  rol: string = sessionStorage.getItem('rol');
  rolboleano = false;

  vacio: string = '';

  constructor(
    private clasificadorService: ClasificadorService,
    private toastrService: ToastrService,
    private fbuilder: FormBuilder,
    private router: Router,
    private solicitudService: SolicitudService,
    private solicitudesAdminService: SolicitudesAdminService
  ) {
    this.getClasificadores();
    this.getSolicitudes();
    //this.rol.trim() ==="ADMIN-USER"? this.rolboleano = true: this.rolboleano;
  }
  public solicitudFormRegister = this.fbuilder.group({
    palabraClave: ['', [Validators.required]],
    asuntoDetallado: ['', [Validators.required]],
    idClasificador: ['', [Validators.required]],
  });

  public archivoRegister = this.fbuilder.group({
    idSolicitud: ['', [Validators.required]],
    comentario: ['', [Validators.required]],
    nombre: ['', ],
    tipo: ['',],
  });

  clasificadorArchivo: string;
  archivo: Archivo = {
    idSolicitud: '',
    archivo: '',
    comentario: '',
    nombre: '',
    tipo: '',
  };
  solicitud: Solicitud = {
    idSolicitud: '',
    archivo: '',
    comentario: '',
  };
  ngOnInit(): void {}

  clasificadores: any = [];
  getClasificadores() {
    this.clasificadorService.getClasificadores().subscribe((resp: any) => {
      this.clasificadores = resp.msg;
    });
  }
  solicitudes: any = [];
  getSolicitudes() {
    this.solicitudService
      .getSolicitudes(sessionStorage.getItem('idUsuario'))
      .subscribe((resp: any) => {
        this.solicitudes = resp.msg;
        console.log(this.solicitudes);
      });
  }

  agregarSolicitud() {
    if (this.solicitudFormRegister.valid) {
      //Insertar en DB
      this.solicitudService
        .insertarSolicitud(
          this.solicitudFormRegister.value,
          String(sessionStorage.getItem('idUsuario'))
        )
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.toastrService.success(resp.msg);
            // this.router.navigateByUrl('dashboard/solicitudes');
            this.solicitudFormRegister.setValue({
              palabraClave: '',
              asuntoDetallado: '',
              idClasificador: '0',
            });
            this.cerrarModal();
            this.getSolicitudes();
          }
        });
    } else {
      this.toastrService.warning('Todos los campos son obligatorios');
    }
  }

  eliminarSolicitud(solicitud: any) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Vas a eliminar la siguiente solicitud`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f3959',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar db
        this.solicitudService
          .eliminarSolicitud(solicitud.idSolicitud)
          .subscribe((resp: any) => {
            if (resp.ok) {
              this.toastrService.success(`Solicitud eliminada`);
              this.getSolicitudes();
            }
          });
      }
    });
  }

  agregarArchivo(solicitud: any) {
    this.clasificadorArchivo = solicitud.descripcion;
    this.archivo.idSolicitud = solicitud.idSolicitud;
    this.archivoRegister.setValue({
      idSolicitud: solicitud.idSolicitud,
      comentario: '',
      nombre: '',
      tipo: '',
    });
    //this.toastrService.warning('En proceso...');
  }

  getSolicitudActualizar(solicitud: any) {
    sessionStorage.setItem('idSolicitud', solicitud.idSolicitud);
    this.router.navigateByUrl(`/dashboard/actualizarSolicitud`);
    // this.solicitudService.getSolicitudActualizar(solicitud.idSolicitud).subscribe((resp:any)=>{
    //   console.log(resp.msg[0].palabraClave);
    //    this.solicitudFormRegister.setValue({palabraClave:resp.msg[0].palabraClave,asuntoDetallado:
    //   resp.msg[0].asuntoDetallado,idClasificador: resp.msg[0].idClasificador});
    //   this.botonAbrir.nativeElement.click();
    // })
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event.addedFiles[0].size);

    if (event.addedFiles[0].size > 50000) {
      this.toastrService.warning('No se permiten archivos muy grandes');
      return;
    }
    this.files.push(...event.addedFiles);
  }
  imageUrl?: string;
  fileSelected?: Blob;
  base64: string;
  convertFileBase64() {
    

    this.files.forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        //  this.base64 = reader.result as string;
        this.archivo.idSolicitud = this.archivoRegister.value.idSolicitud;
        this.archivo.archivo = reader.result as string;
        this.archivo.comentario = this.archivoRegister.get('comentario').value;
        this.archivoRegister.value.nombre = file.name.split('.')[0];
        this.archivoRegister.value.tipo = file.name.split('.')[1];
        
        this.archivo.nombre =  this.archivoRegister.value.nombre;
        this.archivo.tipo = this.archivoRegister.value.tipo;
         console.log(this.archivoRegister.value);
        if (this.archivoRegister.valid) {
          this.solicitudesAdminService
            .insertArchivo(this.archivo)
            .subscribe((resp: any) => {
              if (resp.ok) {
                this.toastrService.success(resp.msg);
                this.archivoRegister.setValue({
                  idSolicitud: '',
                  comentario: '',
                  nombre: '',
                  tipo:''
                });
                this.cerrarModalDropzone();
              }
            });
        } else {
          this.toastrService.warning('Todos los campos son obligatorios');
        }
      };
    });

    // console.log(this.archivo);
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  cerrarModal() {
    this.botonCerraModal.nativeElement.click();
  }
  cerrarModalDropzone() {
    this.botonAbrirDropzone.nativeElement.click();
  }

  cerrarModal2() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `No vas insertar una nueva Solicitud`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f3959',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.botonAbrir.nativeElement.click();
      }
    });
  }
}
