import { Component } from '@angular/core';
import { PolideportivoComponent } from './polideportivo/polideportivo.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PolideportivoComponent,
    RouterLink,
    RouterOutlet,
  ],
  template: `
   <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
          <h1 class="title">Polideportivos de Madrid</h1>
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'polideportivos';
}
