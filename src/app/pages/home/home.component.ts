import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IgdbService } from '../../services/igdb.service';
import { Router } from '@angular/router';
import { GameDetailService } from '../../services/game-detail.service';

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
  games: any[] = [];

  constructor(
    private authService: AuthService,
    private igdbService: IgdbService,
    private router: Router,
    private gameDetailService: GameDetailService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.fetchGenres();
    }
  }

  fetchGames(): void {
    this.igdbService.fetchGames().subscribe(
      (data: any[]) => {
        this.games = data;
      },
      (error: any) => {
        console.error('Error fetching games:', error);
      }
    );
  }

  fetchGenres(): void {
    this.igdbService.fetchGenres().subscribe(
      (genres: any[]) => {
        genres.forEach((genre) => {
          this.genresMap[genre.id] = genre.name;
          console.log(genre.name);
        });
      },
      (error: any) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    /*this.searchResults = [
      {
        id: 1,
        name: 'Gioco di Test',
        cover: { image_id: 'test-cover' },
        genres: [{ name: 'Azione' }, { name: 'Avventura' }],
      },
    ];
    this.searchQuery = 'Gioco di Test';*/

    if (this.searchQuery) {
      this.igdbService.searchGames(this.searchQuery).subscribe(
        (data: any) => {
          this.searchResults = data;

          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Error searching games:', error);
        }
      );
    } else {
      this.searchResults = [];
      this.fetchGames();
      this.cdr.detectChanges();
    }
  }
  setGame = (game: any) => {
    this.gameDetailService.globalData = game;
  };
}
