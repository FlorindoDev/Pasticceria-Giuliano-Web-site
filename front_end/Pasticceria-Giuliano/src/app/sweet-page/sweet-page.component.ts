import { Component, Input } from '@angular/core';
import { Dolce } from '../_services/assortimento/dolce.type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AssortimentoService } from '../_services/assortimento/assortimento.service';
import { Ingrediente } from '../_services/assortimento/ingrediente.type';
import { CartService } from '../_services/cart/cart.service';
import { AuthService } from '../_services/auth/auth.service';
import { Cart } from '../_services/cart/cart.type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'sweet-page',
  imports: [RouterLink],
  templateUrl: './sweet-page.component.html',
  styleUrl: './sweet-page.component.scss'
})


export class SweetPage {

  dolce: Dolce = { idProdotto: null, nome: "null", costo: 0, peso: 0, isShippable: false, tag: "null", image: null, descrizione: null };
  ingredienti: Ingrediente[] = [];

  constructor(
    private route: ActivatedRoute,
    private assortimento_service: AssortimentoService,
    private cart_service: CartService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    let idProdotto = this.route.snapshot.paramMap.get('id') as string;
    if (idProdotto && !isNaN(Number(idProdotto))) {
      this.fetchDolce(idProdotto);

    }
  }

  fetchDolce(idProdotto: string) {
    this.assortimento_service.getDolceById(idProdotto).subscribe({
      next: (value: Dolce) => {
        this.dolce = value;
        this.fetchIngredienti(idProdotto);
      },
    })
  }

  fetchIngredienti(idProdotto: string) {
    this.assortimento_service.getIngredienti(idProdotto).subscribe({
      next: (value: Ingrediente[]) => {
        this.ingredienti = value;
      },
    })
  }

  addCart() {
    let idUser = this.auth.getidUser();
    this.cart_service.getCartUser(idUser).subscribe({
      next: (cart: Cart) => {
        this.cart_service.addItem(idUser, cart.idCart, 1, this.dolce.idProdotto).subscribe({})
        this.toastr.success("Hai aggiunto l'elemento con successo", "Azione Completata!");
      },
    })

  }

}


