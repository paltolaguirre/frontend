import { Formula } from './../../models/formula.model';
import { LogicalOperatorNames } from './../../enums/logical-operator-names.enum';
import { FormulaTransferData } from './../../models/formula-transfer-data.model';
import { MathOperatorNames } from './../../enums/math-operator-names.enum';
import { Operator } from './../../models/operator.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MathOperatorTypes } from '../../enums/math-operator-types.enum';
import { OperatorCategory } from '../../enums/operator-category.enum';

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
        mustRemoveFromSource: false,
        category: OperatorCategory.Math
      },
      {
        id: 2,
        operationName: MathOperatorNames.Subtraction,
        type: MathOperatorTypes.Numeric,
        symbol: '-',
        mustRemoveFromSource: false,
        category: OperatorCategory.Math
      },
      {
        id: 3,
        operationName: MathOperatorNames.Division,
        type: MathOperatorTypes.Numeric,
        symbol: '/',
        mustRemoveFromSource: false,
        category: OperatorCategory.Math
      },
      {
        id: 4,
        operationName: MathOperatorNames.Multiplication,
        type: MathOperatorTypes.Numeric,
        symbol: '*',
        mustRemoveFromSource: false,
        category: OperatorCategory.Math
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
        tooltip: 'Para fórmulas Condicionales. El cálculo depende del cumplimineto de una determinada condición.',
        category: OperatorCategory.Logical
      },
      {
        id: 2,
        operationName: LogicalOperatorNames.GreaterThan,
        type: MathOperatorTypes.Boolean,
        symbol: '>',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Mayor que”',
        category: OperatorCategory.Logical
      },
      {
        id: 3,
        operationName: LogicalOperatorNames.LessThan,
        type: MathOperatorTypes.Boolean,
        symbol: '<',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Menor que”',
        category: OperatorCategory.Logical
      },
      {
        id: 4,
        operationName: LogicalOperatorNames.Equal,
        type: MathOperatorTypes.Boolean,
        symbol: '=',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Igual que”',
        category: OperatorCategory.Logical
      },
      {
        id: 5,
        operationName: LogicalOperatorNames.Diferent,
        type: MathOperatorTypes.Boolean,
        symbol: '<>',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Diferente que”',
        category: OperatorCategory.Logical
      },
      {
        id: 6,
        operationName: LogicalOperatorNames.And,
        type: MathOperatorTypes.Boolean,
        symbol: 'Y',
        mustRemoveFromSource: false,
        tooltip: 'Conjunción de más de una condición  “AND”',
        category: OperatorCategory.Logical
      },
      {
        id: 7,
        operationName: LogicalOperatorNames.Or,
        type: MathOperatorTypes.Boolean,
        symbol: 'ó',
        mustRemoveFromSource: false,
        tooltip: 'Disyunción de más de una condición “OR”',
        category: OperatorCategory.Logical
      }
    ];
  }

  public createMathOperatorsFromFormulas(formulas: Formula[]): Operator[] {
    let idCount: number = 0;

    const operators: Operator[] = formulas.map((formula) => {
      return {
        id: ++idCount,
        operationName: MathOperatorNames.Custom,
        type: MathOperatorTypes.Numeric,
        symbol: formula.name,
        mustRemoveFromSource: false,
        category: OperatorCategory.Math
      };
    });

    return operators;
  }

  public getMoreStaticOperators(): Operator[] {
    return [
      {
        id: 1,
        operationName: LogicalOperatorNames.LessOrEqualThan,
        type: MathOperatorTypes.Boolean,
        symbol: '<=',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Menor Igual que”',
        category: OperatorCategory.Logical
      },
      {
        id: 2,
        operationName: LogicalOperatorNames.GreaterOrEqualThan,
        type: MathOperatorTypes.Boolean,
        symbol: '>=',
        mustRemoveFromSource: false,
        tooltip: 'Condición: “Mayor Igual que”',
        category: OperatorCategory.Logical
      },
      {
        id: 3,
        operationName: MathOperatorNames.Percentage,
        type: MathOperatorTypes.Boolean,
        symbol: '%',
        mustRemoveFromSource: false,
        tooltip: 'Porcentaje”',
        category: OperatorCategory.Math
      },
      {
        id: 4,
        operationName: MathOperatorNames.Pow,
        type: MathOperatorTypes.Numeric,
        symbol: '^',
        mustRemoveFromSource: false,
        tooltip: 'Potencia',
        category: OperatorCategory.Math
      }
    ];
  }

  public emitOperatorClicked(data: FormulaTransferData) {
    this.operatorEmitter.emit(data);
  }
}
