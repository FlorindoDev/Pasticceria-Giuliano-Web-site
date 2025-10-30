import { Component, signal, WritableSignal } from '@angular/core';
import { CartItem } from './cart-item/cart-item.component';
import { CartService } from '../_services/cart/cart.service';
import { AuthService } from '../_services/auth/auth.service';
import { CartItem as Item } from '../_services/cart/cart-item.type';
import { Cart as UserCart } from '../_services/cart/cart.type';
import { DecimalPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cart',
  imports: [CartItem, DecimalPipe, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class Cart {

  items: Item[] = [];
  cart: UserCart | null = null;
  costo_totale: WritableSignal<number> = signal<number>(0);
  isSubmitted: boolean = false;

  constructor(
    private cart_service: CartService,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  checkoutForm = new FormGroup({
    nota: new FormControl('', [
      Validators.maxLength(256)])
  });

  ngOnInit() {
    this.createCart();
  }

  fetchCart() {
    this.cart_service.getCartUser(this.auth.getidUser()).subscribe({
      next: (val) => {
        this.cart = val;
        this.fetchItem();
      }
    })
  }

  createCart() {
    this.cart_service.createCartUser(this.auth.getidUser()).subscribe({
      next: () => {
        this.fetchCart();
      }
    });
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
    this.isSubmitted = true;
    if (this.checkoutForm.invalid) {

      let element = document.querySelectorAll("#form-note textarea");
      console.log(element)
      element.forEach((val) => {
        this.addRedRing(val as HTMLElement, this.isFieldInError(val as HTMLElement));
      });

    } else {

      this.startLoading();
      this.cart_service.chackOut(this.auth.getidUser(), this.checkoutForm.value.nota).subscribe({
        next: (value) => {
          value != null ? window.location.replace(value.url) : this.toastr.warning("Non hai elementi nel carrello", "Attenzione!");

          this.stopLoading();
        },
        error: () => {
          this.stopLoading();
        },
      });

    }
  }

  startLoading() {
    document.getElementById("text-conferma")?.classList.add("hidden");
    document.getElementById("loading-ordine")?.classList.remove("hidden");
  }

  stopLoading() {
    document.getElementById("text-conferma")?.classList.remove("hidden");
    document.getElementById("loading-ordine")?.classList.add("hidden");
  }

  addRedRing(element: HTMLElement, error: unknown | boolean): void {
    if (error) {
      element.classList.add("ring-2");
      element.classList.add("ring-red-400");
    } else {
      element.classList.remove("ring-2");
      element.classList.remove("ring-red-400");
    }
  }

  hendleTyping(event?: Event) {

    let element = event?.target as HTMLElement;
    if (this.isSubmitted) {

      this.addRedRing(element, this.isFieldInError(element));

    }
  }

  isFieldInError(element: HTMLElement) {
    let attr: string = element.getAttribute("formControlName") as string;
    const control = this.checkoutForm.get(attr);
    return control?.errors !== null;

  }

}
