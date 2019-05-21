import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LegajoRoutingModule } from './legajo-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LegajoComponent } from './legajo/legajo.component';
import { DemoMaterialModule } from '../material.module';
import { AddLegajoComponent, AddLegajoDialog } from './legajo/add-legajo/add-legajo.component';
import { LegajoListComponent } from './legajo-list/legajo-list.component';
import { ActionsComponent } from './legajo-list/actions/actions.component';

@NgModule({
  declarations: [LegajoComponent, AddLegajoDialog, AddLegajoComponent, LegajoListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LegajoRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
    AddLegajoDialog
  ]
})
export class LegajoModule { }
