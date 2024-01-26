import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() foods!: Food[];
  @Input() showFavIcon: boolean = true;
  @Output() updateFavoriteList: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  updateFav(food: Food) {
    this.updateFavoriteList.emit(food);
  }

}
