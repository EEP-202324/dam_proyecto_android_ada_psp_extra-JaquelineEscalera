import { Routes } from '@angular/router';
import { PolideportivoComponent } from './polideportivo/polideportivo.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
  {
    path: '',
    component: PolideportivoComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  }
];

export default routeConfig;

