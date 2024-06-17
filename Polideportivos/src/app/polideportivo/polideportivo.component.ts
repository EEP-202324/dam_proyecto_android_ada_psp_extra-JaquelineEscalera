import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolideportivoService } from '../polideportivo.service';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { Polideportivo } from '../polideportivolocation';
import { PolideportivoLocationComponent } from '../polideportivo-location/polideportivo-location.component';

@Component({
  selector: 'app-polideportivo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PolideportivoComponent,
    DetailsComponent,
    PolideportivoLocationComponent
  ],
  template: `
  <section>
    <form>
    <input type="text" placeholder="Filter by city" #filter>
    <button class="primary" type="button" (click)="filtrar(filter.value)">Buscar</button>
    </form>
  </section>
  <section>
  <button type="submit" class="add button-selector" [routerLink]="['/agregar-polideportivo']"
    routerLinkActive="router-link-active" >Agregar polideportivo</button>
</section>
  <section class="results">
      <app-polideportivo
        *ngFor="let polideportivo of listaPolideportivoFiltrada"
        [polideportivo]="polideportivo"
        (polideportivoEliminada)="eliminarPolideportivo($event)">
      </app-polideportivo>
    </section>
  `,
  styleUrls: ['./polideportivo.component.css'],
})
export class PolideportivoComponent {
  listaPolideportivo: Polideportivo[] = [];
  polideportivoService: PolideportivoService = inject(PolideportivoService);
  listaPolideportivoFiltrada: Polideportivo[] = [];

  constructor() {
    this.polideportivoService.getAllPolideportivoS().subscribe(
      polideportivo => {
        this.listaPolideportivo = polideportivo;
        this.listaPolideportivoFiltrada = polideportivo;
      }
    );

    this.polideportivoService.getPolideportivoActualizadaObservable().subscribe(
      updatedPolideportivo => {
        if (updatedPolideportivo) {
          const index = this.listaPolideportivo.findIndex(u => u.id === updatedPolideportivo.id);
          if (index !== -1) {
            this.listaPolideportivo[index] = updatedPolideportivo;
          }
        }
      }
    );
   }

  filtrar(text: string) {
    if (!text) {
      this.listaPolideportivoFiltrada = this.listaPolideportivo;
    } else {
      this.listaPolideportivoFiltrada = this.listaPolideportivo.filter(
        polideportivo => polideportivo?.nombre.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  eliminarPolideportivo(id: number) {
    this.listaPolideportivoFiltrada = this.listaPolideportivoFiltrada.filter(u => u.id !== id);
  }
}

