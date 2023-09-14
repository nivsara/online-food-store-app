import { Food } from "./Food";

export class CartItem {
  price: number = this.food.price;
  quantity: number = 1;
  constructor (public food: Food) {
  }
}
