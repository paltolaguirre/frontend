import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LibrosueldosListComponent } from './librosueldos-list/librosueldos-list.component';
import { LibrosueldosListPrintComponent } from './librosueldos-list/librosueldos-list-print/librosueldos-list-print.component';
import { LibrosueldosEncabezadoPrintComponent } from './librosueldos-list/librosueldos-encabezado-print/librosueldos-encabezado-print.component';

const routes: Routes = [
  {
    path: '',
    component: LibrosueldosListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imprimir',
    component: LibrosueldosListPrintComponent
  },
  {
    path: 'imprimir/encabezado',
    component: LibrosueldosEncabezadoPrintComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosueldosRoutingModule { }
