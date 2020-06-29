import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { DataResponse } from '../models/data.response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_BASE = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<DataResponse<Category[]>> {
    return this.http.get<DataResponse<Category[]>>(`${this.URL_BASE}/categorias`);
  }
}
