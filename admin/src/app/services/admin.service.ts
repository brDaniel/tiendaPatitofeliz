import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  loginAdmin(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.url);
    return this._http.post(this.url + 'admin_login', data, {
      headers: headers,
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (!decodedToken) {
        return false;
      }

      return allowRoles.includes(decodedToken['rol'])

    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

  }
}
