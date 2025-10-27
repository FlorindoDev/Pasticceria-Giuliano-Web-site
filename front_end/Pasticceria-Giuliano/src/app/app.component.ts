import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar.component';
import { LoadingScreen } from './loading-screen/loading-screen.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, LoadingScreen],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('angular-app');
  constructor() { }

}
