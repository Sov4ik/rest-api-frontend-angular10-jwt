import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  // the token expiration date
  // tslint:disable-next-line:variable-name
  private token_expires: Date;

  // the username of the logged in user
  private email: string;

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public getEmail(){
    return this.email;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public updateData() {
    // decode the token to read the username and expiration timestamp
    // tslint:disable-next-line:variable-name
    const token_parts = this.getToken().split(/\./);
    // tslint:disable-next-line:variable-name
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.email = token_decoded.email;
  }
}
