import { FormulasContainer } from './formulas.container';
import { NgModule } from "@angular/core";
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FormulasContainer
  }
];

@NgModule({
  declarations: [FormulasContainer]
})
export class FormulasContainerModule {}