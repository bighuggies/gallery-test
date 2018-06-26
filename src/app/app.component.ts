import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, timer } from 'rxjs';
import { debounce, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchField = new FormControl();
  isLoading = true;

  request$ = this.http
    .get<Photo[]>('http://jsonplaceholder.typicode.com/photos')
    .pipe(tap(() => (this.isLoading = false)));

  photos$: Observable<Photo[]> = combineLatest(
    this.searchField.valueChanges,
    this.request$
  ).pipe(
    debounce(() => timer(200)),
    map(([query, photos]: [string, Photo[]]) => {
      return query
        ? photos.filter(p => p.title.includes(query.toLowerCase()))
        : photos;
    })
  );

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => this.searchField.setValue(''));
  }
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
