import { Routes } from '@angular/router';
import { PolideportivoComponent } from './polideportivo/polideportivo.component';
import { DetailsComponent } from './details/details.component';
import { AgregarPolideportivoComponent } from './agregar-polideportivo/agregar-polideportivo.component';

const routeConfig: Routes = [
  {
    path: '',
    component: PolideportivoComponent,
    title: 'Pagina de inicio'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Detalle del polideportivo'
  },
{
    path: 'agregar-polideportivo',
    component: AgregarPolideportivoComponent,
    title: 'Agregar polideportivo'
  },
];
export default routeConfig;

