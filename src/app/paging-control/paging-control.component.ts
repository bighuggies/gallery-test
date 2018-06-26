import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging-control',
  templateUrl: './paging-control.component.html',
  styleUrls: ['./paging-control.component.css']
})
export class PagingControlComponent {
  @Input() pageNumber = 1;

  @Output() nextPage = new EventEmitter();
  @Output() prevPage = new EventEmitter();
}
