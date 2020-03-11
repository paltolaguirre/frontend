import { FormulaTransferData } from './../../models/formula-transfer-data.model';
import { MathOperatorNames } from './../../enums/math-operator-names.enum';
import { Operator } from './../../models/operator.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MathOperatorTypes } from '../../enums/math-operator-types.enum';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  public operatorEmitter: EventEmitter<FormulaTransferData> = new EventEmitter();

  constructor() { }

  public getBasicMathOperators(): Operator[] {
    return [
      {
        id: 1,
        operationName: MathOperatorNames.Sum,
        type: MathOperatorTypes.Numeric,
        symbol: '+',
        mustRemoveFromSource: false
      },
      {
        id: 2,
        operationName: MathOperatorNames.Subtraction,
        type: MathOperatorTypes.Numeric,
        symbol: '-',
        mustRemoveFromSource: false
      },
      {
        id: 3,
        operationName: MathOperatorNames.Division,
        type: MathOperatorTypes.Numeric,
        symbol: '/',
        mustRemoveFromSource: false
      },
      {
        id: 4,
        operationName: MathOperatorNames.Multiplication,
        type: MathOperatorTypes.Numeric,
        symbol: '*',
        mustRemoveFromSource: false
      }
    ];
  }

  public emitOperatorClicked(data: FormulaTransferData) {
    this.operatorEmitter.emit(data);
  }
}
