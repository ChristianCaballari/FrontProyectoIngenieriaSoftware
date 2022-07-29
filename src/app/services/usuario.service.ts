import { environment } from './../../environments/environment';
import { Login } from './../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getUsuarios() {
    console.log('Hola desde service');
    return this.http.get(`${environment.base_url}/usuarios`);
  }

  getUsuariosPaginados(pagina: number= 1) {
    return this.http.get(`${environment.base_url}/usuarios?pagina=${pagina}`);
    //?pagina=1
  }

  insertarUsuario(usuario:any){
    String(usuario.cedula);
    console.log(usuario);
     return this.http.post(`${environment.base_url}/usuarios`,usuario);
  }

  actualizarRolUsuario(usuario:any){
     return this.http.put(`${environment.base_url}/usuarios`,usuario);
  }

  getUsuarioDataActualizar(idUsuario:any) {

    return this.http.get(`${environment.base_url}/usuarios/${idUsuario}`);
  }

  actualizarUsuario(idUsuario:any, usuario:any){

    console.log("Vamossssssssssssssssssssss");
    console.log(idUsuario);
    console.log(usuario);

    return this.http.put(`${environment.base_url}/usuarios/${idUsuario}`,usuario);
  }

  eliminarUsuario(idUsuario: any) {
   
    
    return this.http.delete(`${environment.base_url}/usuarios/${idUsuario}`);
  }

  login(login: Login) {
    return this.http.post(`${environment.base_url}/login`, login).pipe(
      tap((resp: any) => {
        this.guardarEnStorage(
          resp.msg.token,
          resp.msg.nombre,
          resp.msg.apellido
        );
      })
    );
  }

  validarToken(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }
  guardarEnStorage(token: any, nombre: any, apellido: any) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('apellido', apellido);
  }
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('apellido');
  }
}
