import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, fromEvent, Observable, Subject, timer } from 'rxjs';
import { debounce, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchField = new FormControl();
  currentPage$ = new Subject<number>();

  isLoading = true;
  pageSize = 50;
  pageNumber = 1;

  request$ = this.http
    .get<Photo[]>('http://jsonplaceholder.typicode.com/photos')
    .pipe(tap(() => (this.isLoading = false)));

  photos$: Observable<Photo[]> = combineLatest(
    this.searchField.valueChanges,
    this.currentPage$,
    this.request$
  ).pipe(
    debounce(() => timer(200)),
    map(([query, currentPage, photos]: [string, number, Photo[]]) => {
      return (query
        ? photos.filter(p => p.title.includes(query.toLowerCase()))
        : photos
      ).slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);
    })
  );

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.searchField.setValue('');
      this.currentPage$.next(1);
    });
  }

  trackByFn(i: number, photo: Photo) {
    return photo.id;
  }

  nextPage() {
    this.pageNumber = this.pageNumber + 1;

    this.currentPage$.next(this.pageNumber);
  }

  prevPage() {
    this.pageNumber = Math.max(1, this.pageNumber - 1);

    this.currentPage$.next(this.pageNumber);
  }
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
