export interface User {
    idUser?: number | string,
    nickName: string,
    email: string,
    profilePic: string | null,
    createdAt?: Date,
    updatedAt?: Date
}