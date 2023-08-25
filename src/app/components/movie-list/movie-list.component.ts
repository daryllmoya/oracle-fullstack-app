import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  yearInput: string;
  movies: any[] = [];
  noResultsFound: boolean = false;

  constructor(private movieService: MovieService) {
    this.yearInput = '';
  }

  onInputChanged(): void {
    this.yearInput = this.yearInput.replace(/[^0-9]/g, '');
  }

  searchMoviesByYear() {
    this.movieService.getMoviesByYear(this.yearInput).subscribe(
      (response: any) => {
        if (response.data.length === 0) {
          this.noResultsFound = true;
        } else {
          this.noResultsFound = false;
          this.movies = response.data;
        }
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
}
