import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { PolideportivoService } from '../polideportivo.service';
import { Polideportivo } from '../polideportivolocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article>
    <img class="listing-photo" [src]="polideportivo?.foto"
      alt="Exterior photo of {{polideportivo?.nombre}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{polideportivo?.nombre}}</h2>
      <p class="listing-location">{{polideportivo?.ciudad}}, {{polideportivo?.estado}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">Acerca de la ubicacion</h2>
      <ul>
      <li>Estado: {{polideportivo?.estado}}</li>
    </ul>
    </section>
    <section class="listing-apply">
    <button type="submit" class="primary" (click)="toggleFormulario()"> {{ textoBoton }} </button>
    <button type="button" class="primary" (click)="eliminarPolideportivo()">Eliminar polideportivo</button>
    <form *ngIf="mostrarFormulario" [formGroup]="applyForm" (submit)="submitApplication()">
      <h2 class="section-heading">Modificar polideportivo</h2>
      <label for="first-name">Nombre</label>
      <input id="nombre" type="text" formControlName="nombre">

      <label for="cuidad">ciudad</label>
      <input id="ciudad" type="text" formControlName="ciudad">

      <label for="estado">Estado</label>
      <input id="estado" type="text" formControlName="estado">

      <label for="photo">Imagen</label>
      <input id="photo" type="text" formControlName="photo" placeholder="URL imagen">

      <button type="submit" class="primary">Aplicar</button>
    </form>
  </section>
</article>
`,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  polideportivoService = inject(PolideportivoService);
  polideportivo: Polideportivo | undefined;
  mostrarFormulario: boolean = false;
  textoBoton: string = 'Modificar polideportivo';
applyForm = new FormGroup({
  nombre: new FormControl(''),
  ciudad: new FormControl(''),
  estado: new FormControl(''),
  photo: new FormControl('')
});

@Output() polideportivoActualizada = new EventEmitter<Polideportivo>();

  constructor(private router: Router) {
    const polideportivoId = Number(this.route.snapshot.params['id']);
    this.polideportivoService.getPolideportivoById(polideportivoId).subscribe(
      polideportivo => {
        this.polideportivo = polideportivo;
        this.applyForm.patchValue({
          nombre: polideportivo.nombre,
          ciudad: polideportivo.ciudad,
          estado: polideportivo.estado,
          photo: polideportivo.foto
        });
      }
    );

    this.polideportivoService.getPolideportivoActualizadaObservable().subscribe(
      updatedPolideportivo => {
        if (updatedPolideportivo && this.polideportivo && updatedPolideportivo.id === this.polideportivo.id) {
          this.polideportivo = updatedPolideportivo;
        }
      }
    );
  }

  eliminarPolideportivo(): void {
    if (this.polideportivo) {
      this.polideportivoService.eliminarPolideportivo(this.polideportivo.id).subscribe(
        () => {
          console.log('Polideportivo eliminada exitosamente');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error al eliminar el polideportivo:', error);
        }
      );
    }
  }
  submitApplication() {
    if (this.polideportivo) {
      const updatedPolideportivo: Polideportivo = {
        nombre: this.applyForm.value.nombre || '',
        ciudad: this.applyForm.value.ciudad || '',
        estado: this.applyForm.value.estado || '',
        id: this.polideportivo.id || 0,
        foto: this.applyForm.value.photo || this.polideportivo.foto
      };

      this.polideportivoService.updatePolideportivo(updatedPolideportivo).subscribe(
        updated => {
          console.log("xd", updated)
          this.polideportivo = updated;
          this.polideportivoActualizada.emit(updated);
        },
        error => {
          console.error('Error actualizando polideportivo:', error);
        }
      );
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.textoBoton = this.mostrarFormulario ? 'Ocultar modificador' : 'Modificar polideportivo';
  }
}

