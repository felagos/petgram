import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category, PetModel, DataResponse, Pagination } from '../models';
import { DataResponsePagination } from '../models/data.response.pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_BASE = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<DataResponse<Category[]>> {
    return this.http.get<DataResponse<Category[]>>(`${this.URL_BASE}/categorias`);
  }

  public getPetsByCateogryId(categoryId: string, page: number = 1): Observable<DataResponsePagination<PetModel>> {
    return this.http.get<DataResponsePagination<PetModel>>(`${this.URL_BASE}/mascotas/getByCategoriId/${categoryId}/${page}`);
  }

  public getAllPets(page: number = 1): Observable<DataResponsePagination<PetModel>> {
    return this.http.get<DataResponsePagination<PetModel>>(`${this.URL_BASE}/mascotas/getAllPets/${page}`);
  }

  public addToFavorite(pet: PetModel): Observable<DataResponse<PetModel>> {
    return this.http.put<DataResponse<PetModel>>(`${this.URL_BASE}/favorite`, { pet });
  }

  public deleteFavorite(petId: string): Observable<DataResponse<PetModel>> {
    return this.http.delete<DataResponse<PetModel>>(`${this.URL_BASE}/favorite/${petId}`);
  }

  public getAllFavorities(): Observable<DataResponse<PetModel[]>> {
    return this.http.get<DataResponse<PetModel[]>>(`${this.URL_BASE}/favorite`);
  }

  public savePet(pet: PetModel): Observable<DataResponse<boolean>> {
    return this.http.post<DataResponse<boolean>>(`${this.URL_BASE}/mascotas`, pet);
  }

}
