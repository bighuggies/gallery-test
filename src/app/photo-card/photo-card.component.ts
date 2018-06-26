import { Component, Input } from '@angular/core';

import { Photo } from '../Photo';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent {
  @Input() photo!: Photo;
}
