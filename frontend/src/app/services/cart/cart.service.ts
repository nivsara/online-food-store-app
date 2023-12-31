import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(new Cart());

  constructor() { }

  addToCart(food: Food) {
    const cartValue = this.cartSubject.value;
    let cartItem = cartValue.items.find((item) => item.food.id === food.id);
    if(cartItem) return;
    cartValue.items.push(new CartItem(food));
    cartValue.totalCount = this.updateTotalValues(cartValue).count;
    cartValue.totalPrice = this.updateTotalValues(cartValue).price;
    this.cartSubject.next(cartValue);
  }

  removeFromCart(id: string) {
    const cartValue = this.cartSubject.value;
    cartValue.items = cartValue.items.filter((item) => item.food.id !== id);
    cartValue.totalCount = this.updateTotalValues(cartValue).count;
    cartValue.totalPrice = this.updateTotalValues(cartValue).price;
    this.cartSubject.next(cartValue);
  }

  changeQty(foodId: string, quantity: number) {
    const cartValue = this.cartSubject.value;
    cartValue.items.map((item: CartItem) => {
      if(item.food.id === foodId) {
        item.quantity = quantity;
        item.price = quantity * item.food.price;
      }
    });
    cartValue.totalCount = this.updateTotalValues(cartValue).count;
    cartValue.totalPrice = this.updateTotalValues(cartValue).price;
    this.cartSubject.next(cartValue);
  }

  updateTotalValues(cartValue:Cart) {
    return {
      count: cartValue.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0),
      price: cartValue.items.reduce((prevTotal, currentTotal) => prevTotal + currentTotal.price, 0)
    }
  }

  clearCart() {
    this.cartSubject.next(new Cart());
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

}
