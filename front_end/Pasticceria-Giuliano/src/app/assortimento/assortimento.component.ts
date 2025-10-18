import { Component, Input } from '@angular/core';
import { SweetSection } from '../sweet-section/sweet-section.component';
import { AssortimentoService } from '../_services/assortimento/assortimento.service';
import { Dolce } from '../_services/assortimento/dolce.type';

@Component({
  selector: 'assortimento',
  imports: [SweetSection],
  templateUrl: './assortimento.component.html',
  styleUrl: './assortimento.component.scss'
})


export class Assortimento {

  sections: string[] = ["semi-freddi"];




}
