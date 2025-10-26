import { Component, computed, Input, signal, WritableSignal, } from '@angular/core';
import { CartItem as Item } from '../../_services/cart/cart-item.type';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'cart-item',
  imports: [DecimalPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItem {

  @Input() item: Item = { idCartItem: 0, quantity: 0, CartIdCart: 0, ProdottoIdProdotto: 0, Prodotto: { idProdotto: null, nome: "null", costo: 0, peso: 0, isShippable: false, tag: "null", image: null, descrizione: null } };
  quantity: WritableSignal<number> = signal<number>(this.item.quantity);

  subtotal = computed(() => this.item.Prodotto.costo * this.quantity());

  ngOnInit() {
    this.quantity.update(() => this.item.quantity);
  }

  constructor() {

  }

  addQuantity() {
    this.quantity.update(q => q + 1);
  }

  removeQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }

  }


}
