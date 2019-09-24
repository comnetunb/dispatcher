import { Injectable } from '@angular/core';
import User, { IUser } from '../../../../../../database/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiRoute = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  authenticatedUser?: IUser;

  constructor(
    private http: HttpClient
  ) { }

  async isLoggedIn(): Promise<IUser> {
    if (this.authenticatedUser == null) {
      const user = await this.http.get<IUser>(`${apiRoute}/signed_in`).toPromise();
      this.authenticatedUser = user;
    }

    return this.authenticatedUser;
  }

  async logIn(username: string, password: string): Promise<IUser> {
    const user = await this.http.post<IUser>(`${apiRoute}/sign_in`, {
      username,
      password,
    }).toPromise();
    this.authenticatedUser = user;
    return user;
  }
}