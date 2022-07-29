import { Canton } from './../../../../interfaces/canton.interface';
import { Provincia } from './../../../../interfaces/Provincia.interface';
import { CantonService } from './../../../../services/canton.service';
import { ProvinciaService } from './../../../../services/provincia.service';
import { Router } from '@angular/router';
import { DepartamentoService } from './../../../../services/departamento.service';
import { MensajesService } from './../../../../services/mensajes.service';
import { DistritosService } from './../../../../services/distritos.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaisesService } from './../../../../services/paises.service';
import { Pais } from 'src/app/interfaces/paises.interface';
import { Distrito } from 'src/app/interfaces/distritos.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartamentoInsert } from './../../../../interfaces/despartamento.interface';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  @ViewChild('changeowner') changeOwnerRef: ElementRef;

  @ViewChild('departamentoForm') funcionarioForm: NgForm;
  public formSubmitted = false;
  isDesactiveCanton: boolean = true;
  isDesactiveDistrito: boolean = true;

  public departamentForm = this.fbuilder.group({
    descripcion: ['', [Validators.required, Validators.maxLength(30)]],
    idPais: ['', [Validators.required]],
    idDistritoDep: ['', [Validators.required]],
    idCanton: ['', [Validators.required]],
  });

  paises: Pais[] = [];
  distritos: Distrito[] = [];
  provincias: Provincia[] = [];
  cantones: Canton[] = [];

  departamentInsert: DepartamentoInsert = {
    departamento: '',
    idPronvincia: '',
    idCanton: '',
    idDistritoDep: '',
    idPais: '',
  };

  constructor(
    private paisesService: PaisesService,
    private distritosService: DistritosService,
    private fbuilder: FormBuilder,
    private mensajesService: MensajesService,
    private toastService: ToastrService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private cantonService: CantonService,
    private router: Router
  ) {
    this.cargarPaises();
    this.cargarProvincias();
  }

  cargarPaises() {
    this.paisesService.getPaises().subscribe((resp: any) => {
      if (resp.ok) {
        this.paises = resp.msg;
      }
    });
  }
  cargarProCanDis() {}
  selectProvincia($event: any) {
    let idProvincia = $event.target.value;
    this.cantonService.getCantones(idProvincia).subscribe((resp: any) => {
      if (resp.ok) {
        this.cantones = resp.msg;
        this.isDesactiveCanton = false;
      }
    });
  }
  selectCanton($event: any) {
    let idCanton = $event.target.value;
    this.distritosService
      .getDistritosPorCanton(idCanton)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.distritos = resp.msg;
          this.isDesactiveDistrito = false;
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

  registrarDepartamento(departamentoForm: NgForm) {
    if (
      departamentoForm.value.departamento != '' &&
      departamentoForm.value.idPronvincia != '' &&
      departamentoForm.value.idCanton != '' &&
      departamentoForm.value.idDistritoDep != '' &&
      departamentoForm.value.idPais != ''
    ) {
      //Insertar en db
      parseInt(departamentoForm.value.idDistritoDep);
      parseInt(departamentoForm.value.idPais);
      parseInt(this.departamentInsert.idPronvincia);

     
      this.departamentoService
        .crearDepartamento(this.departamentInsert)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.toastService.success(`Departamento registrado Correctamente`);
            this.router.navigateByUrl('/dashboard/departamentos');
          }
        });
    } else {
      this.toastService.error(`Todos los campos son obligatorios`);
    }
  }
  cerrarModal2() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `No vas insertar un nuevo departamento`,
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
