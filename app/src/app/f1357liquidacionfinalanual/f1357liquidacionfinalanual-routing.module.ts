import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { F1357liquidacionfinalanualListComponent } from './f1357liquidacionfinalanual-list/f1357liquidacionfinalanual-list.component';

const routes: Routes = [
  {
    path: '',
    component: F1357liquidacionfinalanualListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F1357liquidacionfinalanualRoutingModule { }
