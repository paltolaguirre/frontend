import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosueldosRoutingModule } from './librosueldos-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DemoMaterialModule } from '../material.module';
import { LibrosueldosListComponent } from './librosueldos-list/librosueldos-list.component';
import { ActionsComponent } from './librosueldos-list/actions/actions.component';

@NgModule({
  declarations: [ LibrosueldosListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LibrosueldosRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
  ]
})
export class LibrosueldosModule { }
