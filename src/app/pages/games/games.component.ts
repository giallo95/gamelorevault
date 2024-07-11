import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../services/igdb.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})

export class GamesComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 12;
  maxPages = 0;

  games: any[] = [];
  genresMap: any = {};
  visiblePages: number[] = [];

  constructor(private igdbService: IgdbService) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchGames(this.currentPage);
  }

  fetchGenres(): void {
    this.igdbService.fetchGenres().subscribe(
      (genres: any[]) => {
        genres.forEach(genre => {
          this.genresMap[genre.id] = genre.name;
        });
      },
      (error: any) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  fetchGames(page: number): void {
    const offset = (page - 1) * this.pageSize;
    this.igdbService.fetchGames().subscribe(
      (data: any[]) => {
        this.games = data.map(game => {
          let coverUrl = null;
          try {
            // Ottieni la URL della cover, se disponibile
            coverUrl = game.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : null;

            // Se non c'è la cover, usa lo screenshot come fallback
            if (!coverUrl && game.screenshots && game.screenshots.length > 0) {
              coverUrl = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[0].image_id}.jpg`;
            }

            // Se non c'è né cover né screenshot, usa un'immagine di default
            if (!coverUrl) {
              coverUrl = 'path/to/default-image.jpg';
            }
          } catch (error) {
            console.error('Error setting cover URL for game:', game.name, error);
            coverUrl = 'path/to/default-image.jpg';
          }

          return {
            ...game,
            coverUrl: coverUrl,
            genreNames: game.genres ? game.genres.map((id: string | number) => this.genresMap[id]).join(', ') : 'Genre not available'
          };
        });

        // Ordina i giochi per nome
        this.games.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      },
      (error: any) => {
        console.error('Error fetching games:', error);
      }
    );
  }
}
/*export class GamesComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 12;
  maxPages = 0;

  games: any[] = [];
  genresMap: any = {};
  visiblePages: number[] = [];

  constructor(private igdbService: IgdbService) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchGames(this.currentPage);
  }

  fetchGenres(): void {
    this.igdbService.fetchGenres().subscribe(
      (genres: any[]) => {
        genres.forEach(genre => {
          this.genresMap[genre.id] = genre.name;
        });
      },
      (error: any) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  fetchGames(page: number): void {
    const offset = (page - 1) * this.pageSize;
    this.igdbService.fetchGames().subscribe(
      (data: any[]) => {
        this.games = data.map(game => {
          // Ottieni la URL della cover, se disponibile
          let coverUrl = game.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : null;

          // Se non c'è la cover, usa lo screenshot come fallback
          if (!coverUrl && game.screenshots && game.screenshots.length > 0) {
            coverUrl = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[0].image_id}.jpg`;
          }

          // Se non c'è né cover né screenshot, usa un'immagine di default
          if (!coverUrl) {
            coverUrl = 'path/to/default-image.jpg';
          }

          return {
            ...game,
            coverUrl: coverUrl,
            genreNames: game.genres ? game.genres.map((id: string | number) => this.genresMap[id]).join() : 'Genre not available'
          };
        });

        // Ordina i giochi per nome
        this.games.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

      },
      (error: any) => {
        console.error('Error fetching games:', error);
      }
    );
  }
}*/

