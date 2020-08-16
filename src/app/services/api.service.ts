import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category, PetModel, DataResponse, Pagination } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_BASE = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<DataResponse<Category[]>> {
    return this.http.get<DataResponse<Category[]>>(`${this.URL_BASE}/categorias`);
  }

  public getPetsByCateogryId(categoryId: string, page: number = 1): Observable<DataResponse<Pagination<PetModel>>> {
    return this.http.get<DataResponse<Pagination<PetModel>>>(`${this.URL_BASE}/mascotas/getByCategoriId/${categoryId}/${page}`); 
  }

  public getAllPets(page: number = 1): Observable<DataResponse<Pagination<PetModel>>> {
    return this.http.get<DataResponse<Pagination<PetModel>>>(`${this.URL_BASE}/mascotas/getAllPets/${page}`); 
  }

}
