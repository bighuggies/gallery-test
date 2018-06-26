import { Component, Input } from '@angular/core';

import { Photo } from '../Photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent {
  @Input() photos: Photo[] = [];

  trackByFn(i: number, photo: Photo) {
    return photo.id;
  }
}
