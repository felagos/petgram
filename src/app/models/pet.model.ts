export interface PetModel {
    _id?: string;
    categoriaId: string;
    nombre?: string;
    foto: string;
    likes?: number;
    favorite?: boolean;
}