import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LiquidacionRoutingModule } from './liquidacion-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';
import { DialogLiquidaciones } from './liquidacion/liquidacion-dialog/liquidacion-dialog.component';
import { DemoMaterialModule } from '../material.module';
import { LiquidacionListComponent } from './liquidacion-list/liquidacion-list.component';
import { ActionsComponent } from './liquidacion-list/actions/actions.component';
import { LiquidacionPrintComponent } from './liquidacion/liquidacion-print/liquidacion-print.component';

@NgModule({
  declarations: [LiquidacionComponent, LiquidacionListComponent, ActionsComponent ,DialogLiquidaciones, LiquidacionPrintComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LiquidacionRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [DialogLiquidaciones]
})
export class LiquidacionModule { }
