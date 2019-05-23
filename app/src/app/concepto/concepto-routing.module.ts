import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConceptoComponent } from './concepto/concepto.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ConceptoListComponent } from './concepto-list/concepto-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConceptoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id', 
    component: ConceptoComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptoRoutingModule { }
