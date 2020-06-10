import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosueldosdigitalRoutingModule } from './librosueldosdigital-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LibrosueldosdigitalListComponent } from './librosueldosdigital-list/librosueldosdigital-list.component';
import { ActionsComponent } from './librosueldosdigital-list/actions/actions.component';

@NgModule({
  declarations: [ LibrosueldosdigitalListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LibrosueldosdigitalRoutingModule,
    SharedModule,
    MaterialModule
  ],
  entryComponents: [
  ]
})
export class LibrosueldosdigitalModule { }
