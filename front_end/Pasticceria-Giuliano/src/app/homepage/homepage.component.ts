import { Component } from '@angular/core';
import { SweetCard } from '../sweet-card/sweet-card.component';

@Component({
  selector: 'app-homepage',
  imports: [SweetCard],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {

}
