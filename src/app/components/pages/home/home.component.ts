import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  ratingStars: number = 5;
  ratings: number[];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    this.foods = this.foodService.getAll();
    activatedRoute.params.subscribe((param: any)=>{
        this.foods = param.searchTerm ? this.foodService.getAllFoodsbySearch(param.searchTerm): this.foodService.getAll();
    });
    this.ratings = Array(this.ratingStars)
      .fill(0)
      .map((x, i) => i);
  }

  ngOnInit(): void {}
}
