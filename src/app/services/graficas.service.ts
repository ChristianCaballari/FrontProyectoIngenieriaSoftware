import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraficaService {
  constructor(private http: HttpClient) {}


  getDatoSolicitudSinResponder() {
    const url = `${environment.base_url}/graficas/`;
    return this.http.get(url);
}

getCantidadRespuestaLegal() {
  const url = `${environment.base_url}/graficas/${1}`;
  return this.http.get(url);
}
}
