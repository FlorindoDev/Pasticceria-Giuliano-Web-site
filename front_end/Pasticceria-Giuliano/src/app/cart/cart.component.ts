import { Component } from '@angular/core';
import { CartItem } from './cart-item/cart-item.component';
import { CartService } from '../_services/cart/cart.service';
import { AuthService } from '../_services/auth/auth.service';
import { CartItem as Item } from '../_services/cart/cart-item.type';
import { Cart as UserCart } from '../_services/cart/cart.type';

@Component({
  selector: 'cart',
  imports: [CartItem],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class Cart {

  items: Item[] = [];
  cart: UserCart | null = null;

  constructor(private cart_service: CartService, private auth: AuthService) { }

  ngOnInit() {
    this.fetchCart();

  }

  fetchCart() {
    this.cart_service.getCartUser(this.auth.getidUser()).subscribe({
      next: (val) => {
        this.cart = val;
        this.fetchItem();
      }
    })
  }

  fetchItem() {
    this.cart_service.getCartItem(this.auth.getidUser(), this.cart?.idCart).subscribe({
      next: (val: Item[]) => {
        this.items = val;
      }
    })
  }

}
