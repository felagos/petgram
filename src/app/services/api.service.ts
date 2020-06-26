import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_BASE = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL_BASE}/categorias`).pipe(
      map((response: any) => response.data)
    );
  }
}
