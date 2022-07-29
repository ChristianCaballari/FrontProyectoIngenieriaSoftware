import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CantonService {
  constructor(private http: HttpClient) {}

  getCantones(idProvincia:any) {
       const url = `${environment.base_url}/cantones/${idProvincia}`;
       return this.http.get(url);
  }
}