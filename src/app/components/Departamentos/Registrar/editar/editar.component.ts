//import { Departamento } from './../../../../interfaces/despartamento.interface';
import { DepartamentoUpdate } from './../../../../interfaces/despartamento.interface';

import { Canton } from './../../../../interfaces/canton.interface';
import { Provincia } from './../../../../interfaces/Provincia.interface';
import { Router } from '@angular/router';
import { DepartamentoService } from './../../../../services/departamento.service';
import { MensajesService } from './../../../../services/mensajes.service';
import { DistritosService } from './../../../../services/distritos.service';
import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../../../../services/paises.service';
import { Pais } from 'src/app/interfaces/paises.interface';
import { Distrito } from 'src/app/interfaces/distritos.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CantonService } from './../../../../services/canton.service';
import { ProvinciaService } from './../../../../services/provincia.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  public formSubmitted = false;

  public departamentForm = this.fbuilder.group({
    departamento: ['', [Validators.required]],
    idPronvincia: ['', [Validators.required]],
    idCanton: ['', [Validators.required]],
    idDistritoDep: ['', [Validators.required]],
    idPais: ['', [Validators.required]],



    //idDepartamento ,departamento, idProvincia,idCanton , idDistritoDep, idPais
  });

  paises: Pais[] = [];
  distritos: Distrito[] = [];
  provincias: Provincia[] = [];
  cantones: Canton[] = [];
  depa:string ='';

  departamentoUpdate: DepartamentoUpdate = {
    idDepartamento: '',
    departamento: '',
    idPronvincia: '',
    idCanton: '',
    idDistritoDep: '',
    idPais: ''
  }

  isDesactiveCanton : boolean = true;
  isDesactiveDistrito: boolean = true;

  constructor(
    private paisesService: PaisesService,
    private distritosService: DistritosService,
    private fbuilder: FormBuilder,
    private mensajesService: MensajesService,
    private toastService: ToastrService,
    private departamentoService: DepartamentoService,
    private provinciaService:ProvinciaService,
    private cantonService: CantonService,
    private router: Router
  ) {
    this.cargarPaises();
    this.cargarProvincias();
   
    if (sessionStorage.getItem('idDepartamento') != null) {
      this.departamentoService
        .getDepartamentoActualizar(sessionStorage.getItem('idDepartamento'))
        .subscribe((resp: any) => {
          const { idDepartamento, idProvincia,idCanton , idDistritoDep, idPais,departamento  } = resp.msg[0];
          this.depa = departamento;
          console.log(idDistritoDep);
          this.departamentForm.controls['departamento'].setValue(departamento);
          this.departamentForm.controls['idPais'].setValue(idPais);
          this.departamentForm.controls['idPronvincia'].setValue(idProvincia);
          this.selectProvinciaUpdate(idProvincia);
          this.selectCantonUpdate(idCanton);
         
          this.departamentForm.controls['idCanton'].setValue(idCanton);
          
         this.departamentForm.controls['idDistritoDep'].setValue(idDistritoDep);   
    
        });
      
     
    }
  }
  selectProvincia($event:any){
    let idProvincia = $event.target.value;
    this.cantonService.getCantones(idProvincia).subscribe((resp: any) => {
     if (resp.ok) {
       this.cantones = resp.msg;
       this.isDesactiveCanton = false;
     }
   });
   }
   selectProvinciaUpdate(idProvincia:any){
    this.cantonService.getCantones(idProvincia).subscribe((resp: any) => {
     if (resp.ok) {
       this.cantones = resp.msg;
      
     }
   });
   }
   selectCanton($event:any){
     let idCanton = $event.target.value;
     this.distritosService.getDistritosPorCanton(idCanton).subscribe((resp:any)=>{
         if(resp.ok){
           this.distritos = resp.msg;
           //console.log(this.distritos);
           this.isDesactiveDistrito  = false;
         }
     });
   }

   selectCantonUpdate(idCanton:any){
    this.distritosService.getDistritosPorCanton(idCanton).subscribe((resp:any)=>{
        if(resp.ok){
          this.distritos = resp.msg;
          console.log(this.distritos);
        }
    });
  }
  cargarPaises() {
    this.paisesService.getPaises().subscribe((resp: any) => {
      if (resp.ok) {
        this.paises = resp.msg;
      }
    });
  }
  cargarProvincias() {
    this.provinciaService.getProvincias().subscribe((resp: any) => {
      if (resp.ok) {
        this.provincias = resp.msg;
      }
    });
  }

  actualizarDepartament() {
    if (this.departamentForm.valid) {
      console.log(this.departamentForm.value);
      //Insertar en db
      this.departamentoService
        .actualizarDepartamento(
          sessionStorage.getItem('idDepartamento'),
          this.departamentForm.value
        )
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.toastService.success(`Departamento actualizado Correctamente`);
            this.router.navigateByUrl('/dashboard/departamentos');
          }
        });
    } else {
      this.toastService.error(`Todos los campos son obligatorios`);
    }
    console.log(this.departamentForm.value);
  }
  cerrarModal2() {
    console.log(this.departamentoUpdate.departamento);
    Swal.fire({
      title: 'Estas Seguro?',
      text: `No vas a actualizar el departamento ${this.depa}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f3959',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/dashboard/departamentos');
      }
    });
  }
  ngOnInit(): void {}
}
