import { Observable, of } from 'rxjs';
import { DataResponse, PetModel } from '../models';

export class ApiServiceMock {
    getAllFavorities(): Observable<DataResponse<PetModel[]>> {
        const pets: PetModel[] = [];
        const response: DataResponse<PetModel[]> = {
            data: pets
        };

        return of(response);
    }
}