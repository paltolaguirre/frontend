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

@NgModule({
  declarations: [
    MonthSelectorComponent,
    SelectorDefaultComponent,
    TopMenuToolbarComponent,
    TableRowActionsComponent,
    InfoDialogComponent,
    BottomTableActionsComponent,
    YearSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  exports: [
    BottomTableActionsComponent,
    InfoDialogComponent,
    MonthSelectorComponent,
    SelectorDefaultComponent,
    TableRowActionsComponent,
    TopMenuToolbarComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    YearSelectorComponent
  ]
})
export class SharedModule { }
