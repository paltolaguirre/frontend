import { Draggable } from './../interfaces/draggable.interface';
import { MathOperatorNames } from './../enums/math-operator-names.enum';
import { MathOperatorTypes } from './../enums/math-operator-types.enum';

export class Operator implements Draggable {
  id: number;
  operationName: MathOperatorNames;
  type: MathOperatorTypes;
  symbol: string;
  mustRemoveFromSource: boolean;
}
