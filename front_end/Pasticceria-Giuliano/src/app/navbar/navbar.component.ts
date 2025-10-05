import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BurgerMenu } from './burger-menu/burger-menu.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, BurgerMenu],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {

}
