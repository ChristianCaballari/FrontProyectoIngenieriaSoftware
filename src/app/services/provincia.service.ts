import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
  constructor(private http: HttpClient) {}

  getProvincias() {
       const url = `${environment.base_url}/provincias`;
       return this.http.get(url);
  }
}
