import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(private cartService: CartService,
    private userService: UserService,
    private fb: FormBuilder) {
      const cart = this.cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser();
    this.checkoutForm = this.fb.group({
      name: [name, [Validators.required]],
      address: [address, [Validators.required]]
    });
  }

  get checkoutFormCtrls() {
    return this.checkoutForm.controls;
  }

  createOrder( ) {
    if(this.checkoutForm.invalid) return;
    this.order.name = this.checkoutFormCtrls.name.value;
    this.order.address = this.checkoutFormCtrls.address.value;
  }

}
