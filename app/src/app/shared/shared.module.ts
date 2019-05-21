import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatSortModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatButtonToggleModule
} from '@angular/material';
import { TableDataComponent } from './table-data/table-data.component';
import { TableInfoComponent } from './table-data/table-info/table-info.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SelectorComponent } from './toolbar/selector/selector.component';
import { DatepikerComponent } from './toolbar/datepiker/datepiker.component';
import { AddTrasladoComponent, AddTrasladoDialog } from './table-data/table-info/add-traslado/add-traslado.component';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { DemoMaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SelectorDefaultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  entryComponents: [],
  exports: [SelectorDefaultComponent]
})
export class SharedModule { }
