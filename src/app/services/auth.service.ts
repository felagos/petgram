import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/data.response.model';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/token.response';

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

  public doLogin(email: string, password: string): Observable<DataResponse<TokenResponse>> {
    const url = `${this.URL_BASE}/doLogin`;
    return this.http.post<DataResponse<TokenResponse>>(url, { email, password });
  }

  public doRegister(email: string, password: string, name: string): Observable<DataResponse<TokenResponse>> {
    const url = `${this.URL_BASE}/register`;
    return this.http.post<DataResponse<TokenResponse>>(url, { email, password, nombre: name });
  }

  public refreshToken(refreshToken: string): Observable<DataResponse<string>> {
    const url = `${this.URL_BASE}/token`;
    return this.http.get<DataResponse<string>>(url, { headers: { authorization: refreshToken } });
  }

}
