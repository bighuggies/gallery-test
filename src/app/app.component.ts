import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, timer } from 'rxjs';
import { debounce, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchField = new FormControl();

  request$ = this.http.get<Photo[]>(
    'http://jsonplaceholder.typicode.com/photos'
  );

  photos$: Observable<Photo[]> = combineLatest(
    this.searchField.valueChanges,
    this.request$
  ).pipe(
    debounce(() => timer(200)),
    map(([query, photos]: [string, Photo[]]) => {
      return query ? photos.filter(p => p.title.includes(query)) : photos;
    })
  );

  constructor(private http: HttpClient) {}
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
