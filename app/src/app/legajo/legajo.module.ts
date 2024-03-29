import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LegajoRoutingModule } from './legajo-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LegajoComponent } from './legajo/legajo.component';
import { MaterialModule } from '../material.module';
import { LegajoListComponent } from './legajo-list/legajo-list.component';
import { ActionsComponent } from './legajo-list/actions/actions.component';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [LegajoComponent, LegajoListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LegajoRoutingModule,
    MaterialModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ]
})
export class LegajoModule { }
