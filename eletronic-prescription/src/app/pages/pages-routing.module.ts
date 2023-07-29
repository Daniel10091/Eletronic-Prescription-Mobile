import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
