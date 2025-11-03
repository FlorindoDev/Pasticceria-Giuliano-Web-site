import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment.prod';
import { Order } from './order.type';

@Injectable({
    providedIn: 'root'
})
export class OrderService {



    url = environment.apiBaseUrl

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    getOrderUser(idUser: string | null, stato: string) {
        let baseUrl = `${this.url}`;
        if (stato != "TUTTI") {
            baseUrl = `${baseUrl}/orders?iduser=${idUser}&stato=${stato}`;
        } else {
            baseUrl = `${baseUrl}/orders?iduser=${idUser}`;
        }

        return this.http.get<Order[]>(baseUrl, this.httpOptions);
    }


}
