import { MathOperatorTypes } from './../enums/math-operator-types.enum';
export class Operator {
  id: number;
  operationName: MathOperatorTypes;
  type: string; // TODO: Enum without string assignament.   numeric, boolean, etc. 
  symbol: string; // '+'
}
