import { OperatorCategory } from './../enums/operator-category.enum';
import { LogicalOperatorNames } from './../enums/logical-operator-names.enum';
import { Draggable } from './../interfaces/draggable.interface';
import { MathOperatorNames } from './../enums/math-operator-names.enum';
import { MathOperatorTypes } from './../enums/math-operator-types.enum';

export class Operator implements Draggable {
  id: number;
  operationName: MathOperatorNames | LogicalOperatorNames;
  type: MathOperatorTypes;
  symbol: string;
  mustRemoveFromSource: boolean;
  tooltip?: string;
  category: OperatorCategory;
}
