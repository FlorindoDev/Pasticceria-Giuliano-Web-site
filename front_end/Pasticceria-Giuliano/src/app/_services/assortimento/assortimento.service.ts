import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment.prod';
import { Dolce } from './dolce.type';
import { Ingrediente } from './ingrediente.type';


@Injectable({
    providedIn: 'root'
})
export class AssortimentoService {


    url = environment.apiBaseUrl

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    getDolceByTag(tag: string) {
        const url = `${this.url}/products?tag=${tag}`;
        return this.http.get<Dolce[]>(url, this.httpOptions);
    }

    getDolceById(id: string) {
        const url = `${this.url}/products/${id}`;
        return this.http.get<Dolce>(url, this.httpOptions);
    }

    getIngredienti(idDolce: string) {
        const url = `${this.url}/products/${idDolce}/ingredients`;
        return this.http.get<Ingrediente[]>(url, this.httpOptions);
    }




}
