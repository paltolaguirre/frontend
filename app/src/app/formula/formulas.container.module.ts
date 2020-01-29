import { FormulasContainer } from './containers/formulas/formulas.container';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FormulasContainerModule {}
