import { Residenza } from "./residenza.type";

export interface User {
    idUser?: number | string,
    nome: string,
    cognome: string,
    email: string,
    telefono: string | null,
    createdAt?: Date,
    updatedAt?: Date,
    Residenzas?: Residenza[]
}