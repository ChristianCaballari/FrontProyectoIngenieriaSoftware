import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DistritosService {
  constructor(private http: HttpClient) {}

  getDistritos() {
       const url = `${environment.base_url}/distritos`;
       return this.http.get(url);
  }

  getDistritosPorCanton(idCanton:any) {
    const url = `${environment.base_url}/distritos/${idCanton}`;
    return this.http.get(url);
}
}
