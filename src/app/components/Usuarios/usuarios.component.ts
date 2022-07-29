import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public paginaActual: number = 1;

  constructor(private usuarioService:UsuarioService,
    private toastService: ToastrService,
    private router:Router) { 

    //this.cargarUsuarios();
    this.cargarUsuariosPaginados();
  }

  usuarios: any =[]


actualizarRol(usuario:any){

  this.usuarioService.actualizarRolUsuario(usuario).subscribe((resp:any)=>{
       if(resp.ok){
          this.toastService.success(resp.msg);
       }
  });
}

  cargarUsuarios(){
    console.log('Hola');
    this.usuarioService.getUsuarios().subscribe((resp:any) =>{
          this.usuarios = resp.msg;

    console.log(resp.msg[0]);
    })
  }

  cargarUsuariosPaginados(){
    this.usuarioService.getUsuariosPaginados(this.paginaActual).subscribe((resp:any) =>{
      console.log(resp.msg);
         this.usuarios = resp.msg;
    console.log(resp.msg[0]);
    })
  }


  eliminarUsuario(user:any){

    Swal.fire({
      title: 'Estas Seguro?',
      text: `Vas a eliminar al usuario ${user.nombre} ${user.apellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f3959',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar db
        this.usuarioService.eliminarUsuario(user.idUsuario).subscribe(
          (resp:any)=>{
            if(resp.ok){
              this.toastService.success(
                `Usuario ${user.nombre} eliminado`
              );
              this.cargarUsuarios();
            }
          }
        );
      }
    })

  }

  cargarDatosActualizar(user:any){
    sessionStorage.setItem('idUsuario',user.idUsuario);
    this.router.navigateByUrl(`/dashboard/actualizarUsuarios/${user.idDepartamento}`);
  }

  cambiarDePagina(valor: number){
     this.paginaActual += valor;
       if(this.paginaActual <1 ){
      this.paginaActual = 1;
     }else if(this.paginaActual > 3313404){
          this.paginaActual -= valor;
     }
     this.cargarUsuariosPaginados();
  } 

  cargarFormularioRegistro(){
    this.router.navigateByUrl('/dashboard/registrarUsuarios');
  }
  ngOnInit(): void {
  }
}
