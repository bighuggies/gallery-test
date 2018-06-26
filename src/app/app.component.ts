import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Photo[]>('http://jsonplaceholder.typicode.com/photos')
      .subscribe(p => console.log(p));
  }
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
