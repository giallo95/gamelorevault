import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IgdbService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  fetchGames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/games`);
  }

  fetchGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/genres`);
  }

  fetchGameDetails(gameId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${gameId}`);
  }

  fetchCovers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/covers`);
  }

  fetchScreenshots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/screenshots`);
  }

  /* postCover(game: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Client-ID': 'b6w1hquuf1exhlo5arw29ubvol8ils',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
      Authorization: 'Bearer ' + '7g7yonlt3pfsmuvc9n92v1trrtp05l',
    });
    let body = game;
    let options = { headers: header };
    return this.http.post(`https://api.igdb.com/v4/covers`, body, options);
  }*/
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
