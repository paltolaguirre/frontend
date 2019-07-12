import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { F931RoutingModule } from './f931-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DemoMaterialModule } from '../material.module';
import { F931ListComponent } from './f931-list/f931-list.component';
import { ActionsComponent } from './f931-list/actions/actions.component';

@NgModule({
  declarations: [ F931ListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    F931RoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
  ]
})
export class F931Module { }
