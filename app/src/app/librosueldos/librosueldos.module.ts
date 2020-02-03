import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosueldosRoutingModule } from './librosueldos-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LibrosueldosListComponent } from './librosueldos-list/librosueldos-list.component';
import { ActionsComponent } from './librosueldos-list/actions/actions.component';
import { LibrosueldosListPrintComponent } from './librosueldos-list/librosueldos-list-print/librosueldos-list-print.component';
import { LiquidacionModule } from '../liquidacion/liquidacion.module';
import { DialogEncabezado } from './librosueldos-list/encabezado-dialog/encabezado-dialog.component';
import { LibrosueldosEncabezadoPrintComponent } from './librosueldos-list/librosueldos-encabezado-print/librosueldos-encabezado-print.component';

@NgModule({
  declarations: [ LibrosueldosListComponent, ActionsComponent, LibrosueldosListPrintComponent, DialogEncabezado, LibrosueldosEncabezadoPrintComponent],
  imports: [
    CommonModule,
    FormsModule,
    LibrosueldosRoutingModule,
    SharedModule,
    MaterialModule,
    LiquidacionModule
  ],
  entryComponents: [
    DialogEncabezado
  ]
})
export class LibrosueldosModule { }
