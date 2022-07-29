import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SolicitudesAdminService {
  constructor(private http: HttpClient) {}

  getSolicitudesAdmin() {
       const url = `${environment.base_url}/solicitudAdmin`;
       return this.http.get(url);
  }
  updatedSolicitud(solicitud:any) {
    const url = `${environment.base_url}/solicitudAdmin`;
    return this.http.post(url, solicitud);
}

insertArchivo(archivo:any) {
  console.log(archivo);
  const url = `${environment.base_url}/solicitudAdmin/${archivo.idSolicitud}`;
  return this.http.put(url, archivo);
}
getCambiosSolicitud(idSolicitud:any) {
  const url = `${environment.base_url}/solicitudAdmin/${idSolicitud}`;
  return this.http.get(url);
}
}
