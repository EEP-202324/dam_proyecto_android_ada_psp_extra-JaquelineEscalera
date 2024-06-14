import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolideportivoLocationComponent } from '../polideportivo-location/polideportivo-location.component';
import { Polideportivolocation } from '../polideportivolocation';

@Component({
  selector: 'app-polideportivo',
  standalone: true,
  imports: [
    CommonModule,
    PolideportivoLocationComponent
  ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Search</button>
    </form>
  </section>
  <section class="results">
    <app-polideportivo-location [polideportivoLocation]="polideportivolocation"]></app-polideportivo-location>
  </section>
  `,
  styleUrl: './polideportivo.component.css'
})
export class PolideportivoComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  polideportivolocation: Polideportivolocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test city',
    state: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };
}
