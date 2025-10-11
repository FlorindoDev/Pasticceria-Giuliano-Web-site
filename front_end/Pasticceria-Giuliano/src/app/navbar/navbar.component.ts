import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BurgerMenu } from './burger-menu/burger-menu.component';
import { Login } from '../login/login.component';
import { SignUp } from '../sign-up/sign-up.component';
import { signal } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, BurgerMenu, Login, SignUp],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {

  isLogged = signal(false);
  nome = signal<string | null>(null);

  isMenuOpen = false;

  constructor(
    protected authservice: AuthService,
    private UserService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

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

  ngOnInit() {
    this.isLogged.set(this.authservice.isUserAuthenticated());
    this.nome.set(this.UserService.getNome());
  }

  onLogin() {
    this.isLogged.set(this.authservice.isUserAuthenticated());
    this.nome.set(this.UserService.getNome());
  }

  logout() {
    this.authservice.logout();
    setTimeout(() => {
      this.isLogged.set(this.authservice.isUserAuthenticated());
      this.toastr.success("Hai fatto il logout con successo", "Logout Completato!");
      this.router.navigate(["/"]);
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }, 100);

  }

}
