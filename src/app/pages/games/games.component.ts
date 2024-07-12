import { GameDetailService } from './../../services/game-detail.service';
import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../services/igdb.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 12;
  maxPages = 0;

  games: any[] = [];
  genresMap: { [key: string]: string } = {};
  visiblePages: number[] = [];

  constructor(
    private igdbService: IgdbService,
    private gameDetailService: GameDetailService
  ) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchGames();
  }

  fetchGenres(): void {
    this.igdbService.fetchGenres().subscribe(
      (genres: any[]) => {
        genres.forEach((genre) => {
          this.genresMap[genre.id] = genre.name;
        });
      },
      (error: any) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  fetchGames(): void {
    this.igdbService.fetchGames().subscribe(
      (data: any[]) => {
        this.games = data.map((game) => {
          this.gameDetailService.globalData = game;

          // Ottieni i nomi dei generi, se disponibili
          const genreNames = game.genres
            ? game.genres.map((id: number) => this.genresMap[id]).join(' ')
            : 'Genre not available';

          // Ottieni la URL della cover, se disponibile
          let coverUrl = game.cover
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null;

          // Se non c'è la cover, usa lo screenshot come fallback
          if (!coverUrl && game.screenshots && game.screenshots.length > 0) {
            coverUrl = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[0].image_id}.jpg`;
          }

          // Se non c'è né cover né screenshot, usa un'immagine di default
          if (!coverUrl) {
            coverUrl = 'path/to/default-image.jpg';
          }

          // Converti la data di rilascio da timestamp Unix a data leggibile
          const releaseDate = game.release_date
            ? new Date(game.release_date * 1000).toLocaleDateString()
            : 'N/A';

          return {
            ...game,
            coverUrl: coverUrl,
            genreNames: genreNames,
            releaseDate: releaseDate,
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

  setGame = (game: any) => {
    this.gameDetailService.globalData = game;
  };
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
