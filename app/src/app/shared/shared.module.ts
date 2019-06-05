import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { DemoMaterialModule } from '../material.module';

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
