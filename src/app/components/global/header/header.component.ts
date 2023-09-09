import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cartData: Cart) => {
      this.cartCount = cartData?.totalCount;
    })
  }

  ngOnInit(): void {
  }

}
