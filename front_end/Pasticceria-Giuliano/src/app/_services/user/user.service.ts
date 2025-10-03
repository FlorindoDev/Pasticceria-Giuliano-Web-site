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

  uploadprofilePic(iduser: number, image: File) {

    let url = `/users/${iduser}/upload-profile-pic`;
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<{ url: string }>(`${this.url}${url}`, formData, this.httpOptionsMidia);
  }

  getProfilePic(): string | null {
    const user = localStorage.getItem("user");
    if (user) {
      return (JSON.parse(user) as User).profilePic;
    }
    return null;
  }

  updateProfilePic(url: string) {
    const user = localStorage.getItem("user");
    if (user) {
      let user_toupdate = (JSON.parse(user) as User);
      user_toupdate.profilePic = url;
      this.saveUser(user_toupdate);
    }

  }

  getNickName(): string | null {


    const nickName = localStorage.getItem("user");
    if (nickName) {
      return (JSON.parse(nickName) as User).nickName;
    }

    return null;

  }




}
