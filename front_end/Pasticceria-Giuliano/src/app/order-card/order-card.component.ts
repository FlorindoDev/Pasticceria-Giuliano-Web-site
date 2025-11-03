import { Component, Input } from '@angular/core';
import { Order } from '../_services/order/order.type';
import { TagDolce } from './tag-dolce/tag-dolce.component';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'order-card',
  imports: [TagDolce, DatePipe, DecimalPipe],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})


export class OrderCard {

  @Input() ordine: Order | null = null;

  constructor() {

  }

  ngOnInit() {
    console.log(this.ordine);
  }

  get residenzaPrincipale() {
    return this.ordine?.User?.Residenzas?.[0];
  }

}
