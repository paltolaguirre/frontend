import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { F913ListComponent } from './f913-list/f913-list.component';

const routes: Routes = [
  {
    path: '',
    component: F913ListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F913RoutingModule { }
