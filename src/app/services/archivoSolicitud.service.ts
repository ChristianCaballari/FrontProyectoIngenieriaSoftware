import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArchivoSolicitudService {
  constructor(private http: HttpClient) {}

  getArchivoSolitudID(idSolicitud: any) {
    const url = `${environment.base_url}/archivosSolicitud/${idSolicitud}`;
    return this.http.get(url);
  }
  getArchivoSolitudDowload(archivoSolicitud: any) {
    const url = `${environment.base_url}/archivosSolicitud/`;
    return this.http.post(url, archivoSolicitud);
  }
}
