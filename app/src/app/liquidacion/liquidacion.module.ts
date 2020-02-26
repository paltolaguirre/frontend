import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LiquidacionRoutingModule } from './liquidacion-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';
import { DialogLiquidaciones } from './liquidacion/liquidacion-dialog/liquidacion-dialog.component';
import { MaterialModule } from '../material.module';
import { LiquidacionListComponent } from './liquidacion-list/liquidacion-list.component';
import { ActionsComponent } from './liquidacion-list/actions/actions.component';
import { LiquidacionPrintComponent } from './liquidacion/liquidacion-print/liquidacion-print.component';
import { CalcularLiquidacionesPipe } from './calcular-liquidaciones.pipe';
import { DuplicarDialogComponent } from './liquidacion-list/duplicar-dialog/duplicar-dialog.component';
import { ContabilizarDialogComponent } from './liquidacion-list/contabilizar-dialog/contabilizar-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HojadecalculoComponent } from './liquidacion/liquidacionitem/hojadecalculo/hojadecalculo.component';

@NgModule({
  declarations: [LiquidacionComponent, LiquidacionListComponent, ActionsComponent ,DialogLiquidaciones, LiquidacionPrintComponent, CalcularLiquidacionesPipe, DuplicarDialogComponent, ContabilizarDialogComponent, HojadecalculoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LiquidacionRoutingModule,
    MaterialModule,
    MatNativeDateModule,
    SharedModule
  ],
  entryComponents: [DialogLiquidaciones, DuplicarDialogComponent, ContabilizarDialogComponent],
  exports: [CalcularLiquidacionesPipe]
})
export class LiquidacionModule { }
