import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'burger-menu',
  imports: [RouterLink],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss'
})
export class BurgerMenu {

  @Output() isMenuOpen = new EventEmitter<boolean>();
  @Output() logged = new EventEmitter<boolean>();
  @Output() gotoSignup = new EventEmitter<boolean>();
  @Output() gotoLogin = new EventEmitter<boolean>();



  closeMenu() {
    let element = document.getElementById("burger-menu");

    element?.classList.remove("animate-slide-in");
    element?.classList.add("animate-slide-out");

    setTimeout(() => {
      this.isMenuOpen.emit(false);
      element?.classList.add("animate-slide-in");
    }, 300); // stesso tempo della durata dell’animazione (0.3s)

  }

  openLogin() {
    this.logged.emit(false);
  }

  openSignup() {
    this.gotoSignup.emit(false);
  }


}
