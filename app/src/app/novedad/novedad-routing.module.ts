import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovedadComponent } from './novedad/novedad.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { NovedadListComponent } from './novedad-list/novedad-list.component';

const routes: Routes = [
  {
    path: '',
    component: NovedadListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id', 
    component: NovedadComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovedadRoutingModule { }
