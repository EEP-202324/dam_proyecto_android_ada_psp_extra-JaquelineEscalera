import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolideportivoLocationComponent } from '../polideportivo-location/polideportivo-location.component';
import { PolideportivoLocation } from '../polideportivolocation';
import { PolideportivoService } from '../polideportivo.service';
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
      <app-polideportivo-location
        *ngFor="let polideportivoLocation of polideportivoLocationList"
        [polideportivoLocation]="polideportivoLocation">
      </app-polideportivo-location>
    </section>
  `,
  styleUrls: ['./polideportivo.component.css'],
})
export class PolideportivoComponent {
  polideportivoLocationList: PolideportivoLocation[] = [];
  polideportivoService: PolideportivoService = inject(PolideportivoService);

  constructor() {
    this.polideportivoLocationList = this.polideportivoService.getAllPolideportivoLocations();
  }
}
