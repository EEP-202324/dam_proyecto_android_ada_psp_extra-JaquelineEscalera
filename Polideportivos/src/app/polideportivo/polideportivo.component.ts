import { Component } from '@angular/core';

@Component({
  selector: 'app-polideportivo',
  standalone: true,
  imports: [
    PolideportivoComponent,
  ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Buscar</button>
    </form>
  </section>
`,
  styleUrl: './polideportivo.component.css'
})
export class PolideportivoComponent {

}
