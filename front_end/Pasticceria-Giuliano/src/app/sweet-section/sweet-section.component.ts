import { Component, Input } from '@angular/core';
import { Dolce } from '../_services/assortimento/dolce.type';
import { SweetCard } from '../sweet-card/sweet-card.component';
import { AssortimentoService } from '../_services/assortimento/assortimento.service';

@Component({
  selector: 'sweet-section',
  imports: [SweetCard],
  templateUrl: './sweet-section.component.html',
  styleUrl: './sweet-section.component.scss'
})


export class SweetSection {

  constructor(private assortimento_service: AssortimentoService) { }

  @Input() nameSection: string = ""
  dolci: Dolce[] | null = null;

  ngOnInit() {
    this.fetchDolci();
  }

  fetchDolci() {
    this.assortimento_service.getDolceByTag(this.nameSection).subscribe({
      next: (val: Dolce[]) => {
        this.dolci = val;
      }
    })
  }

}
