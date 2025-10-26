import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment.prod';
import { Cart } from './cart.type';
import { CartItem } from './cart-item.type';



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

    getCartItem(idUser: string | null, idCart: number | undefined) {
        const url = `${this.url}/users/${idUser}/carts/${idCart}`;
        return this.http.get<CartItem[]>(url, this.httpOptions);
    }



}
