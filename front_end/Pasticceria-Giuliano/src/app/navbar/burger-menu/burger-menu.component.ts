import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() isLogged: boolean = false;
  @Input() nome: string | null = "";

  constructor(
    protected authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

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

  logout() {
    this.authservice.logout();
    setTimeout(() => {
      this.isLogged = this.authservice.isUserAuthenticated();
      this.toastr.success("Hai fatto il logout con successo", "Logout Completato!");
      this.router.navigate(["/"]);
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }, 100);

  }


}
