import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAllClients(tipo:any, filtro:any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'client/'+tipo+'/'+filtro,{
      headers: headers,
    });
  }
  createClientAdmin(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'client_admin',data,{
      headers: headers,
    });
  }
  getClientAdmin(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'client_admin/'+id,{
      headers: headers,
    });
  }
  updateClientAdmin(id:any,data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'client_admin/'+id,data,{
      headers: headers,
    });
  }
}
