import { Dolce } from "../assortimento/dolce.type"
import { User } from "../user/user.type"

export interface Order {
    idOrdine: number,
    numero_spedizione: string,
    id_pagamento: string,
    nota_spedizione: string | null,
    stato: "IN PREPARAZIONE" | "SPEDITO" | "IN CONSEGNA" | "CONSEGNATO" | "ANNULLATO",
    createdAt?: Date,
    updatedAt?: Date,
    costo: number,
    Prodottos: Dolce[],
    User: User
}