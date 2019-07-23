import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LiquidacionListComponent } from './liquidacion-list/liquidacion-list.component';

const routes: Routes = [
  {
    path: '',
    component: LiquidacionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/:action',
    component: LiquidacionComponent
  },
  {
    path: ':id', 
    component: LiquidacionComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiquidacionRoutingModule { }
