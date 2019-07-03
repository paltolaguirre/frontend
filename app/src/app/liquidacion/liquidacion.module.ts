import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LiquidacionRoutingModule } from './liquidacion-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';
import { DialogLiquidaciones } from './liquidacion/liquidacion-dialog/liquidacion-dialog.component';
import { DialogLiquidacionesList } from './liquidacion-list/liquidacion-list-dialog/liquidacion-list-dialog.component';
import { DemoMaterialModule } from '../material.module';
import { LiquidacionListComponent } from './liquidacion-list/liquidacion-list.component';
import { ActionsComponent } from './liquidacion-list/actions/actions.component';

@NgModule({
  declarations: [LiquidacionComponent, LiquidacionListComponent, ActionsComponent ,DialogLiquidaciones ,DialogLiquidacionesList ],
  imports: [
    CommonModule,
    FormsModule,
    LiquidacionRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [DialogLiquidaciones,DialogLiquidacionesList]
})
export class LiquidacionModule { }
