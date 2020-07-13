import { DataPayload } from './../../../formula/components/formula-draw/formula-draw.component';
import { FormulaTransferData } from './../../models/formula-transfer-data.model';
import { Operator } from './../../models/operator.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MathOperatorTypes } from '../../enums/math-operator-types.enum';
import { OperatorCategory } from '../../enums/operator-category.enum';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  public operatorEmitter: EventEmitter<FormulaTransferData> = new EventEmitter();
  public operatorDropEmitter: EventEmitter<DataPayload> = new EventEmitter();

  constructor() { }

  public emitOperatorClicked(data: FormulaTransferData) {
    this.operatorEmitter.emit(data);
  }

  public emitOperatorDrop(data: DataPayload) {
    this.operatorDropEmitter.emit(data);
  }
}
