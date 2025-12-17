import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment.prod';
import { Observable } from 'rxjs';
import { User } from './user.type';
import { Residenza } from './residenza.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiBaseUrl;

  httpOptionsMidia = {
    headers: new HttpHeaders()
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  getUserFromId(iduser: number | string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${iduser}`, this.httpOptions);
  }

  saveUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem("user");
  }


  getNome(): string | null {

    const nome = localStorage.getItem("user");
    if (nome) {
      return (JSON.parse(nome) as User).nome;
    }

    return null;

  }

  getIndirizzo(iduser: number | string): Observable<Residenza[]> {
    return this.http.get<Residenza[]>(`${this.url}/users/${iduser}/residences`, this.httpOptions);
  }

  updatePhone(iduser: number | string, phone: string) {
    return this.http.put(`${this.url}/users/${iduser}`, { telefono: phone }, this.httpOptions);
  }

  addResidance(iduser: number | string, residenza: Residenza) {
    return this.http.post(`${this.url}/users/${iduser}/residences`, residenza, this.httpOptions);
  }




}
