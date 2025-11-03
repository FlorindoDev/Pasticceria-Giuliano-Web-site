import { Component, Input } from '@angular/core';
import { Dolce } from '../../_services/assortimento/dolce.type';


@Component({
  selector: 'tag-dolce',
  imports: [],
  templateUrl: './tag-dolce.component.html',
  styleUrl: './tag-dolce.component.scss'
})
export class TagDolce {

  @Input() dolce: Dolce | null = null

  constructor() {

  }

  get quantity() {
    return this.dolce?.OrdineProdotto?.quantity
  }

  get nome() {
    return this.dolce?.nome
  }

  get costo() {
    return this.dolce?.OrdineProdotto?.costo
  }

  get peso() {
    return this.dolce?.OrdineProdotto?.peso
  }

}
