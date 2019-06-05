import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovedadRoutingModule } from './novedad-routing.module';

import { SharedModule } from '../shared/shared.module';
import { NovedadComponent } from './novedad/novedad.component';
import { DemoMaterialModule } from '../material.module';
import { NovedadListComponent } from './novedad-list/novedad-list.component';
import { ActionsComponent } from './novedad-list/actions/actions.component';

@NgModule({
  declarations: [NovedadComponent, NovedadListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NovedadRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
  ]
})
export class NovedadModule { }
