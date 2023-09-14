import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: any[] = [];
  constructor(private foodService: FoodService) {
    this.tags = this.foodService.getAllTags();
  }

  ngOnInit(): void {
  }

}
