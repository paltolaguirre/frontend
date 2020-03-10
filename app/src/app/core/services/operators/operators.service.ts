import { MathOperatorNames } from './../../enums/math-operator-names.enum';
import { Operator } from './../../models/operator.model';
import { Injectable } from '@angular/core';
import { MathOperatorTypes } from '../../enums/math-operator-types.enum';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

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
}
