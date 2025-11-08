import { Component } from '@angular/core';
import { OrderCard } from '../order-card/order-card.component';
import { OrderService } from '../_services/order/order.service';
import { AuthService } from '../_services/auth/auth.service';
import { Order } from '../_services/order/order.type';
import { DatePipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'order-page',
  imports: [OrderCard, DatePipe, DecimalPipe],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss'
})
export class OrderPage {

  orders: Order[] = [];

  constructor(private order_service: OrderService, private auth: AuthService) {

  }

  get numeroOrdini() {
    return this.orders?.length;
  }

  get costoTotale() {
    return this.orders.reduce((acc: number, ordine) => acc + ordine.costo, 0);
  }

  get ultimoOridine() {
    if (this.orders.length != 0) {
      return this.orders?.[0].createdAt
    }
    return 0

  }


  ngOnInit() {
    this.fetchOrder();
  }

  onfilter(event: Event, stato: string) {
    this.fetchOrder(stato);
    let element = document.querySelectorAll("#filtro-ordini button");
    element.forEach((val) => {
      val.classList.remove("bg-primary/10")
    });
    (event.target as HTMLElement).classList.add("bg-primary/10")

  }

  fetchOrder(stato: string = "TUTTO") {
    this.order_service.getOrderUser(this.auth.getidUser(), stato).subscribe({
      next: (val: Order[]) => {
        this.orders = val;
      }
    })
  }


}
