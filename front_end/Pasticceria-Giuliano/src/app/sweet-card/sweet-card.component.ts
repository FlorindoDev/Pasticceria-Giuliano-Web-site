import { Component, Input } from '@angular/core';

@Component({
  selector: 'sweet-card',
  imports: [],
  templateUrl: './sweet-card.component.html',
  styleUrl: './sweet-card.component.scss'
})


export class SweetCard {

  @Input() img: string = "";
  @Input() price: string | null = null;
  @Input() typesweet: string = "";
  @Input() isShippable: boolean = false;

}
