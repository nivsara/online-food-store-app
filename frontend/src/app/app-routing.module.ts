import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodDetailComponent } from './components/pages/food-detail/food-detail.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'food/:name/:id', component:FoodDetailComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'cart', component:CartComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
