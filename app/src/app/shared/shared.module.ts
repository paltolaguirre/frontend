import { TableRowActionsComponent } from './components/table-row-actions/table-row-actions.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { MaterialModule } from '../material.module';
import { TopMenuToolbarComponent } from './components/top-menu-toolbar/top-menu-toolbar.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { BottomTableActionsComponent } from './components/bottom-table-actions/bottom-table-actions.component';

@NgModule({
  declarations: [
    SelectorDefaultComponent,
    TopMenuToolbarComponent,
    TableRowActionsComponent,
    InfoDialogComponent,
    BottomTableActionsComponent
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
    SelectorDefaultComponent,
    TableRowActionsComponent,
    TopMenuToolbarComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
