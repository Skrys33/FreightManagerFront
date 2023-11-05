import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movement} from "../../models/Movement";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/movement/',
};
@Injectable({
  providedIn: 'root'
})
export class FreightManagerAPIService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getLatestMovements(limit: number): Observable<Movement[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<Movement[]>(this.apiUrl + 'latest', { params });
  }


  addMovement(movement: Movement): Observable<any> {
    return this.http.post(this.apiUrl + 'add', movement);
  }
}
