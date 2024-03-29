import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NEW_ORDER_FOR_CURRENT_USER, ORDERS_CREATE_URL, ORDERS_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from 'src/app/shared/constants/urls';
import { Order } from 'src/app/shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: Order) {
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(NEW_ORDER_FOR_CURRENT_USER);
  }
  getAllOrdersForCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_URL);
  }

  pay(order: Order): Observable<string> {
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  track(id: Number): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL +  id);
  }

}
