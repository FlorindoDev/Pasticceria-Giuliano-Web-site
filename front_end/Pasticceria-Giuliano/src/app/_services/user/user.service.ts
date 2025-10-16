import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment.prod';
import { Observable } from 'rxjs';
import { User } from './user.type';

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




}
