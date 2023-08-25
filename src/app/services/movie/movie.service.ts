import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMoviesByYear(year: string): Observable<any> {
    const url = `https://jsonmock.hackerrank.com/api/moviesdata?Year=${
      !year ? new Date().getFullYear : year
    }`;
    return this.http.get(url);
  }
}
