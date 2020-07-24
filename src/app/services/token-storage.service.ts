import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
// the token expiration date
// tslint:disable-next-line:variable-name
// const TOKEN_EXP: Date;

// the username of the logged in user
const EMAIL = 'Email';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public getEmail(){
    return sessionStorage.getItem(EMAIL);
  }

  public saveEmail(email: string){
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public updateData() {
    // decode the token to read the username and expiration timestamp
    // tslint:disable-next-line:variable-name
    const token_parts = this.getToken().split(/\./);
    // tslint:disable-next-line:variable-name
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    // this.token_expires = new Date(token_decoded.exp * 1000);
    this.saveEmail(token_decoded.email);
  }
}
