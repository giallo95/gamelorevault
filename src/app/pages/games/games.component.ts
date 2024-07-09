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
  pageRange = 5;
  maxPages = 0;

  games: any[] = [];
  genresMap: any = {};  // Per memorizzare i nomi dei generi
  visiblePages: number[] = []; // Inizializza come array vuoto

  constructor(private igdbService: IgdbService) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchGames();
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

  fetchGames(): void {
    this.igdbService.fetchGames().subscribe(
      (data: any[]) => {
        this.games = data
          .map(game => ({
            ...game,
            coverUrl: game.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : null,
            screenshotUrl: game.screenshots && game.screenshots.length > 0 ? `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[0].image_id}.jpg` : 'path/to/default-image.jpg',
            genreNames: game.genres ? game.genres.map((id: string | number) => this.genresMap[id]).join(', ') : 'No genres'
          }))
          .sort((a, b) => (a.name || '').localeCompare(b.name || '')) // Gestione valori nulli per `name`
          .slice(0, this.pageSize); // Usa this.pageSize per limitare il numero di giochi per pagina

        this.calculatePagination(data.length);
        this.updateVisibleGames();
      },
      (error: any) => {
        console.error('Error fetching games:', error);
      }
    );
  }

  // Funzione per calcolare la paginazione
  calculatePagination(totalGames: number): void {
    this.maxPages = Math.ceil(totalGames / this.pageSize);
    this.visiblePages = []; // Azzera l'array prima di riempirlo

    for (let i = 1; i <= this.maxPages; i++) {
      this.visiblePages.push(i); // Aggiungi l'indice i all'array
    }
  }

  // Funzione per aggiornare i giochi visibili sulla pagina corrente
  updateVisibleGames(): void {
    // Logica per determinare quali giochi visualizzare in base alla pagina corrente
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.games = this.games.slice(startIndex, endIndex);
  }

  // Funzione per navigare alla pagina specificata
  goToPage(page: number): void {
    console.log(`Navigating to page ${page}`);
    this.currentPage = page;
    this.updateVisibleGames();
  }

  goToNextPage(): void {
    if (this.currentPage < this.maxPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToLastPage(): void {
    this.goToPage(this.maxPages);
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

}
