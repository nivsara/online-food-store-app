import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { UserService } from 'src/app/services/user/user.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  food!: Food;
  isLoggedIn!: boolean;
  alertMsg: any=null;

  constructor(activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      this.foodService.getFoodById(params.id).subscribe((food: Food) => {
        this.food = food;
      });
    })
    this.userService.userSubjectObservable.subscribe((userInfo: User) => {
      this.isLoggedIn = userInfo.token ? true : false;
    });
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
    if(!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
      return;
    }
    food.favorite = !food.favorite;
    this.foodService.updateFavorite(food).subscribe((response: any) => {
      if(response.updatedFavorite) {
        this.alertMsg = {
          icon: 'info-circle',
          type: 'success',
          msg: `You have added ${food.name} to your favorite list`
        }
      } else {
        this.alertMsg = {
          icon: 'info-circle',
          type: 'success',
          msg: `You have removed ${food.name} from your favorite list`
        }
      }
    })
  }

}
