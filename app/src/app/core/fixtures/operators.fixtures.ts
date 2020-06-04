import { MathOperatorNames } from '../enums/math-operator-names.enum';
import { MathOperatorTypes } from '../enums/math-operator-types.enum';
import { OperatorCategory } from '../enums/operator-category.enum';
import { Operator } from '../models/operator.model';
import { Formula } from '../models/formula.model';

export class OperatorsFixtures {
  static getMathOperator(): Operator {
    return {
      id: 1,
      operationName: MathOperatorNames.Sum,
      type: MathOperatorTypes.Numeric,
      symbol: '+',
      mustRemoveFromSource: false,
      category: OperatorCategory.Math,
      hasChildren: false
    };
  }

  static getFormulaOperator(): Formula {
    return {
      name: '',
      params: [],
      description: '',
      origin: '',
      type: '',
      scope: '',
      result: '',
      value: 1,
      valueid: 1
    }
  }
}
