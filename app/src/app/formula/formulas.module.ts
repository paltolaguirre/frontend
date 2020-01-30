import { ReactiveFormsModule } from '@angular/forms';
import { FormulasContainer } from './containers/formulas/formulas.container';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaCreateContainer } from './containers/formula-create/formula-create.container';
import { FormulaEditContainer } from './containers/formula-edit/formula-edit.container';

const routes: Routes = [
  {
    path: '',
    component: FormulasContainer
  },
  {
    path: 'create',
    component: FormulaCreateContainer
  },
  {
    path: 'edit/:id',
    component: FormulaEditContainer
  }
];

@NgModule({
  declarations: [FormulasContainer, FormulaCreateContainer, FormulaEditContainer],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FormulasContainerModule {}
