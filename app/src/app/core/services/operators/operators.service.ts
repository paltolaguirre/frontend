import { Operator } from './../../models/operator.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor() { }

  public getBasicMathOperators(): Operator[] {
    return [
      {
        id: 1,
        operationName: '',
        type: '',
        symbol: ''
      },
      {
        id: 2,
        operationName: '',
        type: '',
        symbol: ''
      },
      {
        id: 3,
        operationName: '',
        type: '',
        symbol: ''
      },
      {
        id: 4,
        operationName: '',
        type: '',
        symbol: ''
      }
    ];
  }
}
