import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorDefaultComponent } from './selector-default/selector-default.component';
import { MaterialModule } from '../material.module';
import { CommonTopMenuToolbarComponent } from './components/common-top-menu-toolbar/common-top-menu-toolbar.component';

@NgModule({
  declarations: [
    SelectorDefaultComponent,
    CommonTopMenuToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [],
  exports: [
    SelectorDefaultComponent,
    CommonTopMenuToolbarComponent
  ]
})
export class SharedModule { }
