export interface PetModel {
    _id: string;
    categoriaId: string;
    foto: string;
    likes?: number;
    favorite?: boolean;
}