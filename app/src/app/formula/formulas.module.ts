import { FormulaItemPickerComponent } from './components/formula-item-picker/formula-item-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormulaListContainer } from './containers/formula-list/formula-list.container';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaContainer } from './containers/formula/formula.container';
import { OperatorsToolbarComponent } from './components/operators-toolbar/operators-toolbar.component';
import { FormulaDropSpaceComponent } from './components/formula-drop-space/formula-drop-space.component';
import { FormulaDrawComponent } from './components/formula-draw/formula-draw.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: FormulaListContainer
  },
  {
    path: 'create',
    component: FormulaContainer
  },
  {
    path: 'edit/:name',
    component: FormulaContainer
  }
];

@NgModule({
  declarations: [
    FormulaListContainer,
    FormulaContainer,
    FormulaItemPickerComponent,
    OperatorsToolbarComponent,
    FormulaDrawComponent,
    FormulaDropSpaceComponent,
    TrashComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FormulasContainerModule {}
