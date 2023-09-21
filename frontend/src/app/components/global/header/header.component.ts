import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  user!: User;
  isLoggedIn!: boolean;
  constructor(private cartService: CartService, private userService: UserService) {
    this.cartService.getCartObservable().subscribe((cartData: Cart) => {
      this.cartCount = cartData?.totalCount;
    });
    this.userService.userSubjectObservable.subscribe((userInfo: User) => {
      this.user = userInfo;
      this.isLoggedIn = this.user.token ? true : false;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

}
