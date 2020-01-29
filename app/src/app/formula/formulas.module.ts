import { FormulasContainer } from './containers/formulas/formulas.container';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaCreateComponent } from './containers/formula-create/formula-create.component';

const routes: Routes = [
  {
    path: '',
    component: FormulasContainer
  },
  {
    path: 'create',
    component: FormulaCreateComponent
  }
];

@NgModule({
  declarations: [FormulasContainer, FormulaCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FormulasContainerModule {}
