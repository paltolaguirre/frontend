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
import { MatNativeDateModule } from '@angular/material';
import { LiquidacionPrintCompletoComponent } from './liquidacion/liquidacion-print-completo/liquidacion-print-completo.component';
import { HojadecalculoComponent } from './liquidacion/liquidacionitem/hojadecalculo/hojadecalculo.component';
import { LiquidacionListPrintComponent } from './liquidacion-list-print/liquidacion-list-print.component';
import { LiquidacionListPrintCompletoComponent } from './liquidacion-list-print-completo/liquidacion-list-print-completo.component';
import { LiquidacionListDialog } from './liquidacion-list-dialog/liquidacion-list-dialog.component';

@NgModule({
  declarations: [LiquidacionComponent, LiquidacionListComponent, ActionsComponent ,DialogLiquidaciones, LiquidacionPrintComponent, CalcularLiquidacionesPipe, DuplicarDialogComponent, ContabilizarDialogComponent, LiquidacionPrintCompletoComponent, HojadecalculoComponent, LiquidacionListPrintComponent, LiquidacionListPrintCompletoComponent, LiquidacionListDialog],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LiquidacionRoutingModule,
    MaterialModule,
    MatNativeDateModule,
    SharedModule
  ],
  entryComponents: [DialogLiquidaciones, DuplicarDialogComponent, ContabilizarDialogComponent, LiquidacionListDialog],
  exports: [CalcularLiquidacionesPipe]
})
export class LiquidacionModule { }
