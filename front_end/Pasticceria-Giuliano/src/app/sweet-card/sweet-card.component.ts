import { Component, Input } from '@angular/core';
import { Dolce } from '../_services/assortimento/dolce.type';

@Component({
  selector: 'sweet-card',
  imports: [],
  templateUrl: './sweet-card.component.html',
  styleUrl: './sweet-card.component.scss'
})


export class SweetCard {

  @Input() dolce: Dolce = { idProdotto: null, nome: "null", costo: 0, peso: 0, isShippable: false, tag: "null", image: null, descrizione: null };

}
