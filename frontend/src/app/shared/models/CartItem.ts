import { Food } from "./Food";

export class CartItem {
  price!: number;
  quantity!: number;
  constructor (public food: Food, price?: number, quantity?: number) {
    this.price = price || this.food.price;
    this.quantity = quantity || 1;
  }
}
