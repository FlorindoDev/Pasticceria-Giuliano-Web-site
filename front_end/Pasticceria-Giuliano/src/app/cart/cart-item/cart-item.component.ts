import { Component, computed, EventEmitter, Input, Output, signal, WritableSignal, } from '@angular/core';
import { CartItem as Item } from '../../_services/cart/cart-item.type';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../_services/cart/cart.service';
import { AuthService } from '../../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cart-item',
  imports: [DecimalPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItem {

  @Input() item: Item = { idCartItem: 0, quantity: 0, CartIdCart: 0, ProdottoIdProdotto: 0, Prodotto: { idProdotto: null, nome: "null", costo: 0, peso: 0, isShippable: false, tag: "null", image: null, descrizione: null } };
  quantity: WritableSignal<number> = signal<number>(this.item.quantity);
  @Output() idItemDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() subtotOutput: EventEmitter<number> = new EventEmitter<number>();

  subtotal = computed(() => this.item.Prodotto.costo * this.quantity());

  ngOnInit() {
    this.quantity.update(() => this.item.quantity);
    this.subtotOutput.emit(this.subtotal());
  }

  constructor(
    private cart_service: CartService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {

  }

  addQuantity() {
    let oldTot: number = this.subtotal();
    this.quantity.update(q => q + 1);
    this.subtotOutput.emit(this.subtotal() - oldTot);
    this.cart_service.addItem(this.auth.getidUser(), this.item.CartIdCart, 1, this.item.Prodotto.idProdotto, false).subscribe({})
  }

  removeQuantity() {
    if (this.quantity() > 1) {
      let oldTot: number = this.subtotal();
      this.quantity.update(q => q - 1);
      this.subtotOutput.emit(this.subtotal() - oldTot);
      this.cart_service.addItem(this.auth.getidUser(), this.item.CartIdCart, -1, this.item.Prodotto.idProdotto).subscribe({})
    }

  }

  deleteItem() {
    this.cart_service.deleteItem(this.auth.getidUser(), this.item.CartIdCart, this.item.idCartItem).subscribe({
      next: () => {
        this.toastr.success("Hai eliminato l'elemento con successo", "Rimozione Completata!");
        this.subtotOutput.emit(-this.subtotal());
        this.idItemDeleted.emit(this.item.idCartItem);

      }
    })
  }


}
