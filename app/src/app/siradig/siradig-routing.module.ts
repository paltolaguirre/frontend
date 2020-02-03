import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiradigListComponent } from './siradig-list/siradig-list.component';
import { SiradigShowComponent } from './siradig-show/siradig-show.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SiradigListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id', 
    component: SiradigShowComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiradigRoutingModule { }

