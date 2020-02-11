import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { MaterialModule } from '../material.module';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';

@NgModule({
  declarations: [
    MonthSelectorComponent,
    SelectorDefaultComponent,
    YearSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [],
  exports: [
    MonthSelectorComponent,
    SelectorDefaultComponent,
    YearSelectorComponent
  ]
})
export class SharedModule { }
