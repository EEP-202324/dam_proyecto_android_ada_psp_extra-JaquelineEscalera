import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Polideportivo } from '../polideportivolocation';
import { RouterModule } from '@angular/router';
import { PolideportivoService } from '../polideportivo.service';

@Component({
  selector: 'app-polideportivo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="polideportivo.foto" alt="Exterior photo of {{polideportivo.nombre}}">
    <h2 class="listing-heading">{{ polideportivo.nombre }}</h2>
    <p class="listing-location">{{ polideportivo.ciudad}}, {{polideportivo.estado }}</p>
    <a [routerLink]="['/details', polideportivo.id]">Learn More</a>
    <button type="button" class="delete button-selector" (click)="eliminarPolideportivo(polideportivo.id)">Eliminar polideportivo</button>
    </section>
  `,
  styleUrl: './polideportivo-location.component.css'
})
export class PolideportivoLocationComponent {
  @Input() polideportivo! : Polideportivo;
  @Output() polideportivoEliminada: EventEmitter<number> = new EventEmitter<number>();
constructor(private polideportivoService: PolideportivoService) {}

eliminarPolideportivo(id: number) {
  this.polideportivoService.eliminarPolideportivo(id).subscribe(
    () => {
      console.log('Polideportivo eliminada exitosamente');
      this.polideportivoEliminada.emit(id); // Emitir evento de eliminación
    },
    error => {
      console.error('Error al eliminar la polideportivo:', error);
      // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
    }
  );
}
}
