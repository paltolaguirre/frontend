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

  public createMathOperatorsFromFormulas(formulas: Formula[]): Operator[] {
    let idCount: number = 0;

    const operators: Operator[] = formulas.map((formula) => {
      return {
        id: ++idCount,
        operationName: MathOperatorNames.Custom,
        type: MathOperatorTypes.Numeric,
        symbol: formula.name,
        mustRemoveFromSource: false,
        category: OperatorCategory.Math,
        hasChildren: false
      };
    });

    return operators;
  }

  public getXOROperator(): Operator {
    return {
      id: 1,
      operationName: LogicalOperatorNames.Xor,
      type: MathOperatorTypes.Boolean,
      symbol: 'Ó exclusivo',
      mustRemoveFromSource: false,
      tooltip: 'Disyunción exclusiva de más de una condición “XOR”',
      category: OperatorCategory.Logical,
      hasChildren: true
    };
  }

  public getNumberOperator(): Operator {
    return {
      id: 1,
      operationName: MathOperatorNames.Custom,
      type: MathOperatorTypes.Numeric,
      symbol: 'Número',
      mustRemoveFromSource: false,
      tooltip: 'Permite ingresar un Número directo en la fórmula',
      category: OperatorCategory.Math,
      hasChildren: false
    };
  }

  public emitOperatorClicked(data: FormulaTransferData) {
    this.operatorEmitter.emit(data);
  }

  public getDomIdByOperator(operator: Operator, prefix?: string): string {
    if (prefix) {
      return `${prefix}-${String(operator.id)}`;
    }

    if (operator.type === MathOperatorTypes.Numeric && operator.category === OperatorCategory.Math) {
      return `math-basic-operator-${String(operator.id)}`;
    }

    if (operator.type === MathOperatorTypes.Numeric && operator.category === OperatorCategory.Logical) {
      return `logical-operator-${String(operator.id)}`;
    }

    if (operator.type === MathOperatorTypes.Boolean && operator.category === OperatorCategory.Logical) {
      return `logical-operator-${String(operator.id)}`;
    }
  }
}
