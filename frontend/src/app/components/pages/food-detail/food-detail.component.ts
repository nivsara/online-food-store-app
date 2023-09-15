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
  ratingStars: number = 5;
  ratings: number[];

  constructor(activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService: CartService) {
    activatedRoute.params.subscribe((params) => {
      this.foodService.getFoodById(params.id).subscribe((food: Food) => {
        this.food = food;
      });
    })
    this.ratings = Array(this.ratingStars)
      .fill(0)
      .map((x, i) => i);
  }

  ngOnInit(): void {

  }

  addToCart() {
    this.cartService.addToCart(this.food);
  }

}
