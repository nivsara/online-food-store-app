import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/global/header/header.component';
import { SearchComponent } from './components/global/search/search.component';
import { FoodDetailComponent } from './components/pages/food-detail/food-detail.component';
import { TagsComponent } from './components/global/tags/tags.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { ResultsNotFoundComponent } from './components/global/results-not-found/results-not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';
import { LoaderComponent } from './components/global/loader/loader.component';
import { LoadingInterceptor } from './shared/interceptor/loading/loading.interceptor';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ItemListComponent } from './components/global/item-list/item-list.component';
import { MapComponent } from './components/global/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { PaypalComponent } from './components/global/paypal/paypal.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';
import { RatingComponent } from './components/global/rating/rating.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { FavoriteListComponent } from './components/pages/favorite-list/favorite-list.component';
import { ProductListComponent } from './components/global/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodDetailComponent,
    TagsComponent,
    CartComponent,
    ResultsNotFoundComponent,
    LoginComponent,
    RegisterUserComponent,
    LoaderComponent,
    CheckoutComponent,
    ItemListComponent,
    MapComponent,
    PaymentComponent,
    PaypalComponent,
    OrderTrackComponent,
    RatingComponent,
    ProfileComponent,
    OrdersComponent,
    FavoriteListComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
