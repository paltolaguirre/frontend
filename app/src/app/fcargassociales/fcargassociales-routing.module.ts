import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FcargassocialesListComponent } from './fcargassociales-list/fcargassociales-list.component';

const routes: Routes = [
  {
    path: '',
    component: FcargassocialesListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcargassocialesRoutingModule { }
