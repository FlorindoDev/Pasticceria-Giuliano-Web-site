import { Component, signal, WritableSignal } from '@angular/core';
import { CartItem } from './cart-item/cart-item.component';
import { CartService } from '../_services/cart/cart.service';
import { AuthService } from '../_services/auth/auth.service';
import { CartItem as Item } from '../_services/cart/cart-item.type';
import { Cart as UserCart } from '../_services/cart/cart.type';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'cart',
  imports: [CartItem, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class Cart {

  items: Item[] = [];
  cart: UserCart | null = null;
  costo_totale: WritableSignal<number> = signal<number>(0);

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

  deleteItem(event: number) {
    this.items = this.items.filter((val) => {
      return val.idCartItem != event;
    })
  }

  totale(event: number) {
    this.costo_totale.update(q => q + event);
  }

  checkOut() {
    this.startLoading();
    this.cart_service.chackOut(this.auth.getidUser()).subscribe({
      next: (value) => {
        window.location.replace(value.url);
        this.stopLoading();
      },
      error: (err) => {
        this.stopLoading();
      },
    });
  }

  startLoading() {
    document.getElementById("text-conferma")?.classList.add("hidden");
    document.getElementById("loading-ordine")?.classList.remove("hidden");
  }

  stopLoading() {
    document.getElementById("text-conferma")?.classList.remove("hidden");
    document.getElementById("loading-ordine")?.classList.add("hidden");
  }

}
