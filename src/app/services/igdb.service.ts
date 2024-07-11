import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IgdbService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  fetchGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres`);
  }

  fetchGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/games`);
  }

  fetchGameDetails(gameId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${gameId}`);
  }

  fetchCovers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/covers`);
  }

  fetchScreenshots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/screenshots`);
  }
}

  /*
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  fetchGenres(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/genres`);
  }

  fetchGames(offset: number, pageSize: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/games`);
  }
}

    */


