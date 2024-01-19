import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  foodObservable: Observable<Food[]>;
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    this.foodObservable = this.foodService.getAll();
    activatedRoute.params.subscribe((param: any)=>{
      if(param.searchTerm) {
        this.foodObservable = this.foodService.getAllFoodsbySearch(param.searchTerm);
      } else if (param.tag) {
        this.foodObservable = this.foodService.getFoodByTag(param.tag);
      } else {
        this.foodObservable = this.foodService.getAll();
      }
      this.foodObservable.subscribe((foods: Food[]) => {
        this.foods = foods;
      })
    });
  }

  ngOnInit(): void {}
}
