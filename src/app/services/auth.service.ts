import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`).pipe(
      map((response: any) => {
        // Mappare la risposta del backend a un oggetto contenente solo username ed email
        return {
          username: response.username,
          email: response.email
        };
      })
    );
  }
}
