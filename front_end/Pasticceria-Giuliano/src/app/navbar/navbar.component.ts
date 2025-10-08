import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BurgerMenu } from './burger-menu/burger-menu.component';
import { Login } from '../login/login.component';
import { SignUp } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, BurgerMenu, Login, SignUp],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {

  isMenuOpen = false;

  closeBurger() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLogin() {
    let element = document.getElementById("login");
    element?.classList.remove("hidden");
  }

  openSignup() {
    let element = document.getElementById("signup");
    element?.classList.remove("hidden");
  }

  onLogin() {

  }



}
