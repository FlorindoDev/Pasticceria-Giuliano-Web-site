import { Dolce } from "../assortimento/dolce.type"

export interface CartItem {
    idCartItem: number,
    quantity: number,
    ProdottoIdProdotto: number,
    CartIdCart: number
    Prodotto: Dolce

}