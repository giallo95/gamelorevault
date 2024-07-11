import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IgdbService } from '../../services/igdb.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent implements OnInit {
  game: any;

  genresMap: any = {}

  constructor(
    private route: ActivatedRoute,
    private igdbService: IgdbService
  ) { }

  ngOnInit(): void {
    const gameIdParam = this.route.snapshot.paramMap.get('id');
    if (gameIdParam !== null) {
      const gameId = +gameIdParam;
      this.fetchGameDetails(gameId);
      this.fetchGenres();
    } else {
      console.error('Game ID is null');
    }
  }

  fetchGameDetails(gameId: number): void {
    this.igdbService.fetchGameDetails(gameId).subscribe(
      (data: any) => {
        this.game = {
          ...data,
          coverUrl: data.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.image_id}.jpg` : null,
          screenshotUrl: data.screenshots && data.screenshots.length > 0 ? `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${data.screenshots[0].image_id}.jpg` : null,
          genreNames: data.genres ? data.genres.map((id: string | number) => this.genresMap[id]).join(', ') : 'No genres'
        };
      },
      (error: any) => {
        console.error('Error fetching game details:', error);
      }
    );
  }
  fetchGenres(): void {
    this.igdbService.fetchGenres().subscribe(
      (data: any) => {
        data.forEach((genre: { id: number, name: string }) => {
          this.genresMap[genre.id] = genre.name;
        });
      },
      (error: any) => {
        console.error('Error fetching genres:', error);
      }
    );
  }
}
