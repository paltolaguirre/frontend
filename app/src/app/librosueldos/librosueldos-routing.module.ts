import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LibrosueldosListComponent } from './librosueldos-list/librosueldos-list.component';

const routes: Routes = [
  {
    path: '',
    component: LibrosueldosListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosueldosRoutingModule { }
