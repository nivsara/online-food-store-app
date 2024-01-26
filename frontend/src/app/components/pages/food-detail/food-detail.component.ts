import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  food!: Food;

  constructor(activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService: CartService) {
    activatedRoute.params.subscribe((params) => {
      this.foodService.getFoodById(params.id).subscribe((food: Food) => {
        this.food = food;
      });
    })
  }

  ngOnInit(): void {

  }

  addToCart() {
    this.cartService.addToCart(this.food);
  }

  changeQuantity(food: Food, quantity: string) {
    let foodItem: any = {food: food, quantity: +quantity, price : +quantity * food.price};
    this.cartService.setAllProductsCartObservable(foodItem);
  }

  updateFavs(food: Food) {
    food.favorite = !food.favorite;
    this.foodService.updateFavorite(food).subscribe((response: any) => {
      if(response.updatedFavorite) {
        alert("You have added this to your favorite list")
      } else {
        alert("You have removed this from your favorite list")
      }
    })
  }

}
