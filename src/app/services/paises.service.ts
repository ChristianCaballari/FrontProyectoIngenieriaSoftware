import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  constructor(private http: HttpClient) {}

  getPaises() {
       const url = `${environment.base_url}/paises`;
       return this.http.get(url);
  }

  getDatoUsuarioGrafica() {
    const url = `${environment.base_url}/paises/${1}`;
    return this.http.get(url);
}
}
