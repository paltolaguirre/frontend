import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FcargassocialesRoutingModule } from './fcargassociales-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DemoMaterialModule } from '../material.module';
import { FcargassocialesListComponent } from './fcargassociales-list/fcargassociales-list.component';
import { ActionsComponent } from './fcargassociales-list/actions/actions.component';

@NgModule({
  declarations: [ FcargassocialesListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    FcargassocialesRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
  ]
})
export class FcargassocialesModule { }
