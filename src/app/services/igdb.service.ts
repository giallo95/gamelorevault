import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IgdbService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  fetchGenres(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/genres`);
  }

  fetchGames(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/games`);
  }
}

  /*
  private apiUrl = 'https://api.igdb.com/v4/games';
  private genresUrl = 'https://api.igdb.com/v4/genres';
  private clientId = 'b6w1hquuf1exhlo5arw29ubvol8ils';
  private accessToken = '7g7yonlt3pfsmuvc9n92v1trrtp05l';

  constructor(private http: HttpClient) {}

  fetchGames(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Client-ID': this.clientId,
      'Authorization': `Bearer ${this.accessToken}`,
      'Allow-Control-Allow-Origin': '*'
    });

    const body = `
      fields name,cover.image_id,genres,screenshots.image_id;
      limit 12;
      sort name asc;
    `;

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  fetchGenres(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Client-ID': this.clientId,
      'Authorization': `Bearer ${this.accessToken}`,
      'Allow-Control-Allow-Origin': '*'
    });

    const body = `fields id,name;`;

    return this.http.post<any>(this.genresUrl, body, { headers });
  }
    */

