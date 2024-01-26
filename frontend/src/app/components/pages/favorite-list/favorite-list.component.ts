import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  foods: Food[] = [];
  foodObservable!: Observable<Food[]>;

  constructor(private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.foodObservable = this.foodService.getAll();
    this.getAllFavFoods();
    this.updateFoodList();
  }

  getAllFavFoods(): Observable<Food[]> {
    this.foodObservable = this.foodService.getAll();
    return this.foodObservable;
  }

  updateFoodList() {
    this.foodObservable.subscribe((foods: Food[]) => {
      this.foods = foods.filter((foodItem) => foodItem.favorite);
    })
  }

  updateFav(food: Food) {
    food.favorite = !food.favorite;
    this.foodService.updateFavorite(food).pipe(
      switchMap((response: any) => {
        if (response.updatedFavorite) {
          alert("You have added this to your favorite list");
        } else {
          alert("You have removed this from your favorite list");
        }
        return this.getAllFavFoods();
      })
    ).subscribe(
      (updatedFoods) => {
        this.updateFoodList();
      },
      (error) => {
      }
    );
  }


}
