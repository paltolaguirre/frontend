import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { F931ListComponent } from './f931-list/f931-list.component';

const routes: Routes = [
  {
    path: '',
    component: F931ListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F931RoutingModule { }
