import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders!: Order[];

  constructor(private orderService: OrderService) {
    this.orderService.getAllOrdersForCurrentUser().subscribe((orders: Order[]) => {
      this.orders = orders;
    })
  }

  ngOnInit(): void {
  }

}
