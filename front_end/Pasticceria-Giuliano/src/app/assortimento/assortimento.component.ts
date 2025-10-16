import { Component, Input } from '@angular/core';
import { SweetCard } from '../sweet-card/sweet-card.component';
import { AssortimentoService } from '../_services/assortimento/assortimento.service';
import { Dolce } from '../_services/assortimento/dolce.type';

@Component({
  selector: 'assortimento',
  imports: [SweetCard],
  templateUrl: './assortimento.component.html',
  styleUrl: './assortimento.component.scss'
})


export class Assortimento {

  dolce: Dolce[] = [];

  constructor(private assortimento_service: AssortimentoService) { }

  /*
  fetchAssortimento() {
    this.assortimento_service.getDolce().subscribe({
      next: (dolce: Dolce[]) => {
        this.dolce = dolce;
      }
    })
  }
  */


}
