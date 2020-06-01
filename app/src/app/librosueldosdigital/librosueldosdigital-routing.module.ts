import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LibrosueldosdigitalListComponent } from './librosueldosdigital-list/librosueldosdigital-list.component';

const routes: Routes = [
  {
    path: '',
    component: LibrosueldosdigitalListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosueldosdigitalRoutingModule { }
