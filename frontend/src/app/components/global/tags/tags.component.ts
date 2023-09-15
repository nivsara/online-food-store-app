import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: any[] = [];
  constructor(private foodService: FoodService) {
    this.foodService.getAllTags().subscribe((tags: Tag[]) =>{
      this.tags = tags;
    });
  }

  ngOnInit(): void {
  }

}
