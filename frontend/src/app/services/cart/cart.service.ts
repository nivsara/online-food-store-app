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
  allProductsAdded: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() { }

  addToCart(food: Food) {
    const cartValue = this.cartSubject.value;
    if(cartValue.items.length > 0) {
      cartValue.items.map((item: CartItem) => {
        if(item.food.id === food.id) {
          this.allProductsAdded.value.forEach((foodItem: any) => {
            if(foodItem.id === item.food.id) {
              item.quantity = foodItem.quantity;
              item.price = foodItem.price;
            }
          });
        }
      });
    }

    if(this.allProductsAdded.value.length > 0) {
      this.allProductsAdded.value.forEach((item: any) => {
        if(cartValue.items.length > 0) {
          cartValue.items.map((cartItem: CartItem) => {
            if(item.id === cartItem.food.id) {
              cartItem.quantity = item.quantity;
              cartItem.price = item.price;
            } else {
              cartValue.items.push(new CartItem(item.food, item.price, item.quantity));
            }
          });
        } else {
          cartValue.items.push(new CartItem(item.food, item.price, item.quantity));
        }
      });
    } else {
      cartValue.items.push(new CartItem(food));
    }
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

  clearAllProductsCart() {
    this.allProductsAdded.next([]);
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  setAllProductsCartObservable(value: any) {
    this.allProductsAdded.next([...this.allProductsAdded.value, value]);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

}
