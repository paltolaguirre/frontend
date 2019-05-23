import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConceptoRoutingModule } from './concepto-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ConceptoComponent } from './concepto/concepto.component';
import { DemoMaterialModule } from '../material.module';
import { AddConceptoComponent, AddConceptoDialog } from './concepto/add-concepto/add-concepto.component';
import { ConceptoListComponent } from './concepto-list/concepto-list.component';
import { ActionsComponent } from './concepto-list/actions/actions.component';

@NgModule({
  declarations: [ConceptoComponent, AddConceptoDialog, AddConceptoComponent, ConceptoListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ConceptoRoutingModule,
    DemoMaterialModule,
    SharedModule
  ],
  entryComponents: [
    AddConceptoDialog
  ]
})
export class ConceptoModule { }
