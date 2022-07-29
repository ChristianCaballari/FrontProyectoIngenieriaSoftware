import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  nombre = sessionStorage.getItem('nombre');
  apellido = sessionStorage.getItem('apellido');
  ADMIN :string = 'ADMIN-ROL';
  USER: string = 'USER-ROL';
   rol:string = sessionStorage.getItem('rol');
   foto:string = sessionStorage.getItem('foto');
  constructor(
    private sidebarService: SidebarService,
    private toastService: ToastrService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    if(this.rol.trim() == this.ADMIN){ 
      this.menuItems = this.sidebarService.menu;
    }else if(this.rol.trim() == this.USER){
    this.menuItems = this.sidebarService.menuUserROL;
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
   // console.log(rol, 'Desde ngOnInit', rol = 'ADMIN-ROL');
   }
  logout() {
    this.router.navigateByUrl('/login');
    this.usuarioService.logout();
    this.toastService.info(
      `Se ha cerrado sesión correctamente`);
  }
}
