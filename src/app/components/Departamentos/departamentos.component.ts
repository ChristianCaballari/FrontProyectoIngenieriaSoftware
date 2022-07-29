import { MensajesService } from './../../services/mensajes.service';
import { DepartamentoService } from './../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoG } from 'src/app/interfaces/despartamento.interface';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  
   departamentos: DepartamentoG[] = [];

  
  constructor(
    private router: Router,
    private departamentoService: DepartamentoService,
    private mensajesService:MensajesService,
    private toastService: ToastrService
  ) {
   this.getDepartamentos();
  }

  
  getDepartamentos(){
      this.departamentoService.getDepartamentos().subscribe((resp:any)=>{
        this.departamentos = resp.msg;
        console.log(this.departamentos);
      })
  }
  eliminarDepartamento(departamento:any){

    Swal.fire({
      title: 'Estas Seguro?',
      text: `Vas a eliminar el departamento  ${departamento.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f3959',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar db
        this.departamentoService.eliminarDepartamento(departamento.idDepartamento).subscribe(
          (resp:any)=>{
            if(resp.ok){
              this.toastService.success(
                `Departamento ${departamento.descripcion} eliminado`
              );
              this.getDepartamentos();
            }
          }
        );
      }
    })
  }

  cargarDatosActualizar(departamento:any){

    //this.departamentoService.getDepartamentoActualizar(departamento.idDepartamento).subscribe(
    //  (resp:any)=>{

    sessionStorage.setItem('idDepartamento',departamento.idDepartamento);
        this.router.navigateByUrl(`/dashboard/actualizarDepartamento/${departamento.idDepartamento}`);
        // this.router.navigateByUrl('/dashboard/departamentos');
   //   }
   // )
  }

  ngOnInit(): void {}
}
