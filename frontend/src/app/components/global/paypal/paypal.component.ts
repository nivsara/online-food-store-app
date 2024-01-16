import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/shared/models/Order';

declare var paypal: any;

@Component({
  selector: 'paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  @Input() order!: Order;
  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(private orderService: OrderService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'CAD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              alert("Payment done successfully");
              this.router.navigateByUrl('/track/' + orderId);
            },
            error: (error) => {
            }
          }
        );
      },

      onError: (err: any) => {
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }

}
