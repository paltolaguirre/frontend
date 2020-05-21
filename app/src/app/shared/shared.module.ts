import { FormulaCloneDialogComponent } from './../formula/components/formula-clone-dialog/formula-clone-dialog.component';
import { TableRowActionsComponent } from './components/table-row-actions/table-row-actions.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { MaterialModule } from '../material.module';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { TopMenuToolbarComponent } from './components/top-menu-toolbar/top-menu-toolbar.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { BottomTableActionsComponent } from './components/bottom-table-actions/bottom-table-actions.component';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';

@NgModule({
  declarations: [
    MonthSelectorComponent,
    SelectorDefaultComponent,
    TopMenuToolbarComponent,
    TableRowActionsComponent,
    InfoDialogComponent,
    BottomTableActionsComponent,
    YearSelectorComponent,
    DisableControlDirective,
    FormulaCloneDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [
    InfoDialogComponent,
    FormulaCloneDialogComponent
  ],
  exports: [
    BottomTableActionsComponent,
    DisableControlDirective,
    InfoDialogComponent,
    MonthSelectorComponent,
    SelectorDefaultComponent,
    TableRowActionsComponent,
    TopMenuToolbarComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    YearSelectorComponent,
    FormulaCloneDialogComponent
  ]
})
export class SharedModule { }
