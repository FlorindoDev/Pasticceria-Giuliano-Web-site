import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment.prod';
import { Cart } from './cart.type';
import { CartItem } from './cart-item.type';
import { not } from 'rxjs/internal/util/not';

//TODO: Refactoring

@Injectable({
    providedIn: 'root'
})
export class CartService {


    url = environment.apiBaseUrl

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    getCartUser(idUser: string | null) {
        const url = `${this.url}/users/${idUser}/carts`;
        return this.http.get<Cart>(url, this.httpOptions);
    }

    createCartUser(idUser: string | null) {
        const url = `${this.url}/users/${idUser}/carts`;
        return this.http.post(url, this.httpOptions);
    }

    addItem(body: addItemRequest, loadingApi: boolean = true) {

        if (!loadingApi) {
            this.httpOptions.headers = this.httpOptions.headers.set('X-no-Loading', '');
        }

        const url = `${this.url}/users/${body.idUser}/carts/${body.idCart}`;

        let result = this.http.post(url, { quantity: body.quantity, idProdotto: `${body.idProdotto}` }, this.httpOptions);

        this.httpOptions.headers = this.httpOptions.headers.delete('X-no-Loading', '');
        return result;
    }

    getCartItem(idUser: string | null, idCart: number | undefined) {
        const url = `${this.url}/users/${idUser}/carts/${idCart}`;
        return this.http.get<CartItem[]>(url, this.httpOptions);
    }

    deleteItem(idUser: string | null, idCart: number | undefined, idItem: number) {
        const url = `${this.url}/users/${idUser}/carts/${idCart}/${idItem}`;
        return this.http.delete(url, this.httpOptions);
    }


    chackOut(idUser: string | null, nota: string | null | undefined) {
        const url = `${this.url}/users/${idUser}/checkout-session`;
        return this.http.post<{ url: string }>(url, { nota_spedizione: nota }, this.httpOptions);

    }



}
