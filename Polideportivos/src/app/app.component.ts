import { Component } from '@angular/core';
import { PolideportivoComponent } from './polideportivo/polideportivo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
  <main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    </header>
    <section class="content">
      <app-polideportivo></app-polideportivo>
    </section>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'polideportivos';
}
