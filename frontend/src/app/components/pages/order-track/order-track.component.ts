import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss']
})
export class OrderTrackComponent implements OnInit {

  order!: Order;
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if(!params.orderId) return;
    orderService.track(params.orderId).subscribe(order => {
      this.order = order;
    })
  }

  ngOnInit(): void {
  }

}
