import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-slide-category',
  templateUrl: './slide-category.component.html',
  styleUrls: ['./slide-category.component.scss'],
})
export class SlideCategoryComponent {

  @Input() public categories: Category[] = [];
  @Output() public showCategoryEvent = new EventEmitter<string>();

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,
    slidesPerView: 3
  };

  constructor() { }

  showCategory(id: string) { 
    this.showCategoryEvent.emit(id);
  }

}
