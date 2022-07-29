import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fbuilder.group({
    email: ['', [Validators.required, Validators.email,Validators.minLength(9), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastService: ToastrService
  ) {}

  loginUser() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value).subscribe((resp:any) => {
        if (resp.ok) {
          sessionStorage.setItem('idUsuario', resp.msg.id);
          sessionStorage.setItem('rol',(resp.msg.rol));
          sessionStorage.setItem('foto',(resp.msg.foto));

          if(sessionStorage.getItem('rol').trim() === 'ADMIN-ROL'){
            this.router.navigateByUrl('/dashboard/solicitudAdmin');
          }else{
            this.router.navigateByUrl('/dashboard/solicitudes');
          }

          this.toastService.success(
            `Bienvenido ${resp.msg.nombre} ${resp.msg.apellido}`
          );
          
        } else {
          this.toastService.error(`Opps ${resp.msg}`);
        }
      });
    } 
  }
  ngOnInit(): void {}

  campoNoValido(input: string): boolean {
    return this.loginForm.get(input)?.invalid && this.formSubmitted
      ? true
      : false;
  }
}
