import { FormulasContainer } from './formulas.container';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FormulasContainer
  }
];

@NgModule({
  declarations: [FormulasContainer],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FormulasContainerModule {}
