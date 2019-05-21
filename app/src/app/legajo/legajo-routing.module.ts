import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegajoComponent } from './legajo/legajo.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LegajoListComponent } from './legajo-list/legajo-list.component';

const routes: Routes = [
  {
    path: '',
    component: LegajoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id', 
    component: LegajoComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegajoRoutingModule { }
