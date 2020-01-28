import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { MaterialModule } from '../material.module';
import { CommonTopMenuToolbarComponent } from './components/common-top-menu-toolbar/common-top-menu-toolbar.component';
import { CommonTableRowActionsComponent } from './components/common-table-row-actions/common-table-row-actions.component';

@NgModule({
  declarations: [
    SelectorDefaultComponent,
    CommonTopMenuToolbarComponent,
    CommonTableRowActionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [],
  exports: [
    SelectorDefaultComponent,
    CommonTableRowActionsComponent,
    CommonTopMenuToolbarComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
