import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiradigRoutingModule } from './siradig-routing.module';
import { SiradigShowComponent } from './siradig-show/siradig-show.component';
import { SiradigListComponent } from './siradig-list/siradig-list.component';
import { ActionsComponent } from './siradig-list/actions/actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [SiradigShowComponent, SiradigListComponent, ActionsComponent],
  imports: [
    CommonModule,
    SiradigRoutingModule,
    FormsModule,
    DemoMaterialModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule
  ]
})
export class SiradigModule { }
