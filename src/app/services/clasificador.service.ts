import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClasificadorService {
  constructor(private http: HttpClient) {}
  
  getClasificadores() {
       const url = `${environment.base_url}/clasificador`;
       return this.http.get(url);
  }

  getCantidadSolictudPorClasificador() {
    const url = `${environment.base_url}/clasificador/${1}`;
    return this.http.get(url);
}
}