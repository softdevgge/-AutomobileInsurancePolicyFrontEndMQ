import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginInfo } from './login-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/token/';
  private registerUrl = 'http://127.0.0.1:8000/api/register/';

  loggedInfo? : LoginInfo;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { username, password }).subscribe(res => {
      localStorage.setItem('access_token', res.access);

      this.loggedInfo = new LoginInfo();
      //this.loggedInfo.role = this.tokenInfo.Role;
      this.loggedInfo.token = res.access;
      this.loggedInfo.username = username;
      this.loggedInfo.isLoggedIn = true;      
      localStorage.setItem('loggedInfo', JSON.stringify(this.loggedInfo));


      this.router.navigate(['/quoteform']);
    });
  }

  register(username: string, password: string) {
    return this.http.post<any>(this.registerUrl, { username, password });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}

