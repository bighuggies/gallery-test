import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Photo[]>('http://jsonplaceholder.typicode.com/photos')
      .subscribe(photos => (this.photos = photos));
  }
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
