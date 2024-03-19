import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleLogin(arg0: { token: string; }) {
    throw new Error('Method not implemented.');
  }
   private accessTokenKey = 'accessToken'; // إضافة خاصية accessTokenKey هنا

  constructor(private http: HttpClient, private router: Router) { }

  register(body: any) {
    return this.http.post(`${environment.api}/register`, body);
  }
  rmRregister(body: any) {
    return this.http.post(`${environment.api}/rmuser_register`, body);
  }

  

  login(body: any) {
    return this.http.post(`${environment.api}/login`, body, { withCredentials: true }).pipe(
      tap((res: any) => {
        this.setAccessToken(res.token);
      })
    );
  }

  user() {
    return this.http.get(`${environment.api}/user`);
  }

  refresh() {
    return this.http.post(`${environment.api}/refresh`, {}, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${environment.api}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.removeAccessToken();
      })
    );
  }

  get accessToken(): string {
    return localStorage.getItem(this.accessTokenKey) || '';
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }




  facebookLogin(token: string) {
    return this.http.post(`${environment.api}/facebook-login`, { token }, { withCredentials: true }).pipe(
      tap((res: any) => {
        this.setAccessToken(res.token);
      })
    );
  }









  
}