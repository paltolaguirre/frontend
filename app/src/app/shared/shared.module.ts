import { TableRowActionsComponent } from './components/table-row-actions/table-row-actions.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { MaterialModule } from '../material.module';
import { CommonTopMenuToolbarComponent } from './components/common-top-menu-toolbar/common-top-menu-toolbar.component';

@NgModule({
  declarations: [
    SelectorDefaultComponent,
    CommonTopMenuToolbarComponent,
    TableRowActionsComponent
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
    TableRowActionsComponent,
    CommonTopMenuToolbarComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
