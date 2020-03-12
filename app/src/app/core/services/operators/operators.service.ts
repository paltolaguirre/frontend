import { LogicalOperatorNames } from './../../enums/logical-operator-names.enum';
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

  public getLogicalOperators(): Operator[] {
    return [
      {
        id: 1,
        operationName: LogicalOperatorNames.If,
        type: MathOperatorTypes.Numeric,
        symbol: 'SI',
        mustRemoveFromSource: false,
        tooltip: 'Para fórmulas Condicionales. El cálculo depende del cumplimineto de una determinada condición.'
      },
      {
        id: 2,
        operationName: LogicalOperatorNames.GreaterThan,
        type: MathOperatorTypes.Boolean,
        symbol: '>',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Mayor que”'
      },
      {
        id: 3,
        operationName: LogicalOperatorNames.SmallerThan,
        type: MathOperatorTypes.Boolean,
        symbol: '<',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Menor que”'
      },
      {
        id: 4,
        operationName: LogicalOperatorNames.Equal,
        type: MathOperatorTypes.Boolean,
        symbol: '=',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Igual que”'
      },
      {
        id: 5,
        operationName: LogicalOperatorNames.Diferent,
        type: MathOperatorTypes.Boolean,
        symbol: '<>',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Diferente que”'
      },
      {
        id: 6,
        operationName: LogicalOperatorNames.And,
        type: MathOperatorTypes.Boolean,
        symbol: 'Y',
        mustRemoveFromSource: false,
        tooltip: 'Conjunción de más de una condición  “AND”'
      },
      {
        id: 7,
        operationName: LogicalOperatorNames.Or,
        type: MathOperatorTypes.Boolean,
        symbol: 'ó',
        mustRemoveFromSource: false,
        tooltip: 'Disyunción de más de una condición “OR”'
      }
    ];
  }

  public emitOperatorClicked(data: FormulaTransferData) {
    this.operatorEmitter.emit(data);
  }
}
