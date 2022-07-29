import { DepartamentoInsert } from './../interfaces/despartamento.interface';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  constructor(private http: HttpClient) {}

   
  cargarDepartamentos(desde: number=0) {
       const url = `${environment.base_url}/departamentos?/=${desde}`;
       return this.http.get(url);
  }

  crearDepartamento(departamento: DepartamentoInsert){
    console.log(departamento);
   
    return this.http.post(`${environment.base_url}/departamentos`,departamento);
  }

  eliminarDepartamento(idDepartamento: any){
    console.log(idDepartamento);
    const url = `${environment.base_url}/departamentos/${idDepartamento}`;
    return this.http.delete(url);
  }

  getDepartamentos(){
    return this.http.get(`${environment.base_url}/departamentos`);
  }

  getDepartamentoActualizar(idDepartamento: any){
    return this.http.get(`${environment.base_url}/departamentos/${idDepartamento}`);
  }

  actualizarDepartamento(idDepartamento: any,departamento:any){
    console.log(idDepartamento,'==================');

    console.log(departamento.idPais, '//////////////');
    console.log(departamento);
    return this.http.put(`${environment.base_url}/departamentos/editar/${idDepartamento}`,departamento);
  }
}
