import { UsuarioService } from './../../../services/usuario.service';
import { SexoService } from './../../../services/sexo.service';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editarUsuario.component.html',
  styleUrls: ['./editarUsuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  public formSubmitted = false;

  public usuarioFormRegister = this.fbuilder.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    idSexo: ['', [Validators.required]],
    cedula: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
    idDepartamento: ['', [Validators.required]],
    fechaVencimiento: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    foto: ['']
  });

  departamentos: any = ([] = []);
  sexos: any = ([] = []);

  constructor(
    private router: Router,
    private departamentoService: DepartamentoService,
    private fbuilder: FormBuilder,
    private sexoService: SexoService,
    private usuarioService: UsuarioService,
    private toastService: ToastrService
  ) {
    this.getDepartamentos();
    this.getSexo();
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService
      .getUsuarioDataActualizar(sessionStorage.getItem('idUsuario'))
      .subscribe((resp: any) => {
        console.log(resp);
        const {
          nombre,
          apellidos,
          cedula,
          celular,
          correo,
          idDepartamento,
          idSexo,
          fechaVencimiento,
        } = resp.msg[0];
         let  password = '';
         let foto = '';

        console.log(resp.msg[0]);

        this.usuarioFormRegister.setValue({
          nombre,
          apellidos,
          idSexo,
          cedula,
          idDepartamento,
          fechaVencimiento,
          correo,
          celular,
          password,
          foto
        });
      });
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((resp: any) => {
      this.departamentos = resp.msg;
      console.log(this.departamentos);
    });
  }

  getSexo() {
    this.sexoService.getSexo().subscribe((resp: any) => {
      this.sexos = resp.msg;
    });
  }
  getBase64(e:any) {
    let base;
  
      let extencionPermitida = /(.png|.jpg)$/i;
      let extencionvalida = e.target.files[0].name;
      if (!extencionPermitida.exec(extencionvalida)) {
       this.toastService.warning('Solo se permiten archivos tipo png y jpg');
        return;
      }
  
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //console.log(reader.result);
          base = reader.result;
          sessionStorage.setItem('base64',String(base));  
        }
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
  }
  actualizarUsuario(){
    this.usuarioFormRegister.value.foto = sessionStorage.getItem('base64');
  
    console.log( this.usuarioFormRegister.value.foto);
  
     if(this.usuarioFormRegister.value.nombre === ''){
      this.toastService.warning('El nombre es obligatorio');
     }
     if(this.usuarioFormRegister.value.apellidos === ''){
      this.toastService.warning('El apellido es obligatorio');
     }
     if(this.usuarioFormRegister.value.idSexo === ''){
      this.toastService.warning('El tipo de genero es obligatorio');
     }
     if(this.usuarioFormRegister.value.idDepartamento === ''){
      this.toastService.warning('El departamento es obligatorio');
     }
     if(this.usuarioFormRegister.value.cedula === '' || String(this.usuarioFormRegister.value.cedula).length != 9 ){
  
      this.toastService.warning('Cedula obligatoria (9 caracteres)');
     }
     if(this.usuarioFormRegister.value.fechaVencimiento === ''){
      this.toastService.warning('La la fecha Vencimiento');
     }
     if(this.usuarioFormRegister.value.celular === '' || String(this.usuarioFormRegister.value.celular).length != 8){
      this.toastService.warning('Telefono obligatorio (8 caracteres');
     }
     if(this.usuarioFormRegister.value.correo === ''){
      this.toastService.warning('El correo es obligatorio y valido');
     }
     if(this.usuarioFormRegister.value.passwor === ''){
      this.toastService.warning('El password es obligatorio (6 caracteres minimo)');
     }
  
    if(this.usuarioFormRegister.valid){
      
         if(sessionStorage.getItem('base64') === ''){
          this.toastService.warning('Foto Obligatoria');
         }else{
           //Insertar en DB
            this.usuarioService.actualizarUsuario(sessionStorage.getItem('idUsuario'),this.usuarioFormRegister.value).subscribe((resp:any)=>{
               if(resp.ok){
                  this.toastService.success(resp.msg);
                  sessionStorage.removeItem('base64');
                  this.router.navigateByUrl('/dashboard/usuarios');
               }
           })
         }
    }else{
      this.toastService.warning('Todos los datos obligatorios y Validos');
    }
  }
  ngOnInit(): void {}
}

