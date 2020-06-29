import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/data.response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BASE = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient) { }

  public existsEmail(email: string): Observable<DataResponse<boolean>> {
    const url = `${this.URL_BASE}/existsEmail`;
    return this.http.post<DataResponse<boolean>>(url, { email });
  }

}
