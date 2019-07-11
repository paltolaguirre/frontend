import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { F913RoutingModule } from './f913-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DemoMaterialModule } from '../material.module';
import { F913ListComponent } from './f913-list/f913-list.component';
import { ActionsComponent } from './f913-list/actions/actions.component';

@NgModule({
  declarations: [ F913ListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    F913RoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
  ]
})
export class F913Module { }
