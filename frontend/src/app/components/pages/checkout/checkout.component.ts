import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
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
  isSubmitted: boolean = false;
  constructor(private cartService: CartService,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router) {
      const cart = this.cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
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
    if(!this.order.addressLatLng) return;

    this.order.name = this.checkoutFormCtrls.name.value;
    this.order.address = this.checkoutFormCtrls.address.value;
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        alert(errorResponse.error);
      }
    });
  }

}
