import { SolicitudService } from './../../../services/solicitud.service';
import { ClasificadorService } from './../../../services/clasificador.service';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './editarSolicitud.component.html',
  //styleUrls: ['./solicitudes.component.css']
})
export class EditarSolicitudComponent implements OnInit {
  
  constructor(private clasificadorService: ClasificadorService, private toastrService: ToastrService,
    private fbuilder: FormBuilder, private router: Router, private solicitudService: SolicitudService) {
    this.getClasificadores();
    this.getSolicitudActualizar();
  }
  public solicitudFormRegister = this.fbuilder.group({
    palabraClave: ['', [Validators.required]],
    asuntoDetallado: ['', [Validators.required]],
    idClasificador: ['', [Validators.required]],
  });
  ngOnInit(): void {
  }

  clasificadores: any = [];
  getClasificadores(){
    this.clasificadorService.getClasificadores().subscribe((resp:any)=>{
       this.clasificadores = resp.msg;
    })
  }

  agregarSolicitud(){

    console.log(this.solicitudFormRegister.value);
    if(this.solicitudFormRegister.valid){
   //Insertar en DB
     this.solicitudService.actualizarSolicitud(this.solicitudFormRegister.value,String(sessionStorage.getItem('idSolicitud'))).subscribe(
      (resp:any)=>{
        if(resp.ok){
        this.toastrService.success(resp.msg);
       // this.router.navigateByUrl('dashboard/solicitudes');

        this.solicitudFormRegister.setValue({palabraClave:'',asuntoDetallado:'',idClasificador:'0'});
         this.router.navigateByUrl('/dashboard/solicitudes');
        }
      }
     );
    }else{
      this.toastrService.warning("Todos los campos son obligatorios");
    }
  }
  getSolicitudActualizar(){
    this.solicitudService.getSolicitudActualizar(sessionStorage.getItem('idSolicitud')).subscribe((resp:any)=>{ 
      console.log(resp.msg[0].palabraClave);
       this.solicitudFormRegister.setValue({palabraClave:resp.msg[0].palabraClave,asuntoDetallado:
      resp.msg[0].asuntoDetallado,idClasificador: resp.msg[0].idClasificador});
    })
  }

  cerrarModal2(){
    Swal.fire({
      title: 'Estas Seguro?',
      text: `No vas actualizar la presente solicitud`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f3959',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, volver!',
    }).then((result) => {
      if (result.isConfirmed) {
       this.router.navigateByUrl('/dashboard/solicitudes');
      }
    });
  }
}
