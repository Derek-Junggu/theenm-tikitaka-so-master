import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { newHomeComponent } from './new_home.component';

const routes: Routes = [
  {
    path: '',
    component: newHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
