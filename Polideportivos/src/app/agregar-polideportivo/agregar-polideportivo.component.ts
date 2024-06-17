import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolideportivoService } from '../polideportivo.service';

@Component({
  selector: 'app-agregar-polideportivo',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <section class="listing-apply">
  <form [formGroup]="FormPolideportivo" (submit)="agregar()">
    <h2 class="section-heading">Agregar polideportivo</h2>
    <label for="nombre">Nombre</label>
    <input id="nombre" type="text" formControlName="nombre">

    <label for="ciudad">Ciudad</label>
    <input id="ciudad" type="text" formControlName="ciudad">

    <label for="estado">Estado</label>
    <input id="estado" type="text" formControlName="estado">

    <label for="photo">Imagen</label>
    <input id="photo" type="text" formControlName="photo">

    <button type="submit" class="primary">Aplicar</button>
  </form>
</section>

  `,
  styleUrl: './agregar-polideportivo.component.css'
})
export class AgregarPolideportivoComponent {
  FormPolideportivo = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    foto: new FormControl('')
  });

  constructor(private polideportivoService:PolideportivoService) {}

  agregar() {
    const { nombre, ciudad, estado, foto } = this.FormPolideportivo.value;

    const polideportivoDatos = {
      nombre: nombre?.trim() ?? '',
      ciudad: ciudad?.trim() ?? '',
      estado: estado?.trim() ?? '',
      foto: foto?.trim() ?? ''
    };

    this.polideportivoService.agregarPolideportivo(polideportivoDatos).subscribe({
      next: nuevaPolideportivo => {
        console.log('Nuevo polideportivo agregada', nuevaPolideportivo);
        alert('Polideportivo agregado exitosamente');
      },
      error: error => {
        console.log('Error al agregar', error);
        alert('No se ha podido agregar');
      }
    })
  }
}

