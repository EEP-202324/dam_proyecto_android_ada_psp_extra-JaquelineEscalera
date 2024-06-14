import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Polideportivolocation } from '../polideportivolocation';

@Component({
  selector: 'app-polideportivo-location',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="polideportivoLocation.photo" alt="Exterior photo of {{polideportivoLocation.name}}">
    <h2 class="listing-heading">{{ polideportivoLocation.name }}</h2>
    <p class="listing-location">{{ polideportivoLocation.city}}, {{polideportivoLocation.state }}</p>
  </section>
  `,
  styleUrl: './polideportivo-location.component.css'
})
export class PolideportivoLocationComponent {
  @Input() polideportivoLocation! : Polideportivolocation;
}
