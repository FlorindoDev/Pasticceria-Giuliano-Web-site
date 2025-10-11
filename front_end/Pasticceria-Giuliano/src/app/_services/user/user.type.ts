export interface User {
    idUser?: number | string,
    nome: string,
    email: string,
    profilePic: string | null,
    createdAt?: Date,
    updatedAt?: Date
}