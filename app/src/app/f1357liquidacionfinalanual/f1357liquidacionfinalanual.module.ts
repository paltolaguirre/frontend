import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { F1357liquidacionfinalanualRoutingModule } from './f1357liquidacionfinalanual-routing.module';

import { SharedModule } from '../shared/shared.module';
import { F1357liquidacionfinalanualListComponent } from './f1357liquidacionfinalanual-list/f1357liquidacionfinalanual-list.component';
import { ActionsComponent } from './f1357liquidacionfinalanual-list/actions/actions.component';

@NgModule({
  declarations: [ F1357liquidacionfinalanualListComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    F1357liquidacionfinalanualRoutingModule,
    SharedModule,
    MaterialModule
  ],
  entryComponents: [
  ]
})
export class F1357liquidacionfinalanualModule { }
