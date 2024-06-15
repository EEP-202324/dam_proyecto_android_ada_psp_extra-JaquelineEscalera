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
    <input type="text" placeholder="Filter by city" #filter>
    <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
      <app-polideportivo-location
        *ngFor="let polideportivoLocation of filteredLocationList"
        [polideportivoLocation]="polideportivoLocation">
      </app-polideportivo-location>
    </section>
  `,
  styleUrls: ['./polideportivo.component.css'],
})
export class PolideportivoComponent {
  polideportivoLocationList: PolideportivoLocation[] = [];
  polideportivoService: PolideportivoService = inject(PolideportivoService);
  filteredLocationList: PolideportivoLocation[] = [];

  constructor() {
    this.polideportivoService.getAllPolideportivoLocations().then((polideportivoLocationList: PolideportivoLocation[]) => {
      this.polideportivoLocationList = polideportivoLocationList;
      this.filteredLocationList = polideportivoLocationList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.polideportivoLocationList;
      return;
    }

    this.filteredLocationList = this.polideportivoLocationList.filter(
      polideportivoLocation => polideportivoLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
