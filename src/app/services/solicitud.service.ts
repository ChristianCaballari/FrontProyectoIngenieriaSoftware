import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {}
  
  insertarSolicitud(solicitud:any, idUsuario:any) {
       const url = `${environment.base_url}/solicitud/${idUsuario}`;
       return this.http.post(url, solicitud);
  }

  actualizarSolicitud(solicitud:any, idSolicitud:any) {

     console.log(solicitud);
     console.log(idSolicitud);
     
     const url = `${environment.base_url}/solicitud/${idSolicitud}`;
     return this.http.put(url, solicitud);
}

  getSolicitudes(idUsuario:any) {
     const url = `${environment.base_url}/solicitud?idUsuario=${idUsuario}`;
     return this.http.get(url);
}

eliminarSolicitud(idSolicitud:any){
     return this.http.delete(`${environment.base_url}/solicitud/${idSolicitud}`);
}
getSolicitudActualizar(idSolicitud:any){
     return this.http.get(`${environment.base_url}/solicitud/${idSolicitud}`);
}

}