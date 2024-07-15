import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IgdbService } from '../../services/igdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  searchResults: any[] = [];
  genresMap: { [key: string]: string } = {};

  constructor(
    private authService: AuthService,
    private igdbService: IgdbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.fetchGenres();
    }
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

  onSearch(): void {
    this.igdbService.searchGames(this.searchQuery).subscribe(
      (results: any[]) => {
        this.searchResults = results.map((game) => {
          const genreNames = game.genres
            ? game.genres.map((id: number) => this.genresMap[id]).join(', ')
            : 'Genre not available';

          let coverUrl = game.cover
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null;

          if (!coverUrl && game.screenshots && game.screenshots.length > 0) {
            coverUrl = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[0].image_id}.jpg`;
          }

          if (!coverUrl) {
            coverUrl = 'path/to/default-image.jpg';
          }

          const releaseDate = game.first_release_date
            ? new Date(game.first_release_date * 1000).toLocaleDateString()
            : 'N/A';

          return {
            ...game,
            coverUrl: coverUrl,
            genreNames: genreNames,
            releaseDate: releaseDate,
          };
        });
      },
      (error: any) => {
        console.error('Error searching games:', error);
      }
    );
  }
  setGame(game: any): void {
    this.router.navigate(['/game-details', game.id]);
  }
}
