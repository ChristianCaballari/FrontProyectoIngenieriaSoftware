import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SexoService {
  constructor(private http: HttpClient) {}

  getSexo() {
       const url = `${environment.base_url}/sexo`;
       return this.http.get(url);
  }
}
