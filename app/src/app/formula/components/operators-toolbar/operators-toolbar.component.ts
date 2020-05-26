import { DataPayload } from './../formula-draw/formula-draw.component';
import { MathOperatorTypes } from './../../../core/enums/math-operator-types.enum';
import { FormulaTransferData } from './../../../core/models/formula-transfer-data.model';
import { OperatorsService } from './../../../core/services/operators/operators.service';
import { Operator } from './../../../core/models/operator.model';
import { FormulaTypes } from './../../../core/constants/formula-types.constants';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { Formula } from 'src/app/core/models/formula.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operators-toolbar',
  templateUrl: './operators-toolbar.component.html',
  styleUrls: ['./operators-toolbar.component.scss']
})
export class OperatorsToolbarComponent implements OnInit {

  public formulas: Formula[];
  public moreOperators: any;
  public selectedOperator: Formula = null;
  public basicMathOperators: any[];
  public logicalOperators: any[];
  public isMoreOperatorsListOpened: boolean;

  constructor(
    private formulaService: FormulaService,
    private operatorsService: OperatorsService
  ) { }

  ngOnInit() {
    this.fetchFormulas();

    this.operatorsService.operatorDropEmitter.subscribe((operator: DataPayload) => {
      this.closeMoreOperatorsList();
    });
  }

  public fetchFormulas() {
    this.formulaService.formulasStore$.subscribe((formulas: Formula[]) => {
      this.setSymbols(formulas);
      this.formulas = formulas;

      const formulaOperators: Formula[] = this.formulaService.extractFormulasByType(
        this.formulas,
        FormulaTypes.OPERATOR
      );

      this.basicMathOperators = this.formulaService.extractBasicMathOperators(formulaOperators);
      this.logicalOperators = this.formulaService.extractLogicalOperators(formulaOperators);

      const itemsToRemove = [
        ...this.basicMathOperators,
        ...this.logicalOperators
      ];
      itemsToRemove.forEach(item => {
        formulaOperators.splice(formulaOperators.findIndex(e => e.name === item.name), 1);
      });

      this.moreOperators = [
        ...formulaOperators
      ];
    });
  }

  private setSymbols(formulas: Formula[]) {
    formulas.forEach(formula => {
      switch (formula.name) {
        case "Sum":
          formula.symbol = "+";
          break;
        case "Diff":
          formula.symbol = "-";
          break;
        case "Div":
          formula.symbol = "/";
          break;
        case "Multi":
          formula.symbol = "*";
          break;
        case "If":
          formula.symbol = "SI";
          break;
        case "Greater":
          formula.symbol = ">";
          break;
        case "Less":
          formula.symbol = "<";
          break;
        case "Equality":
          formula.symbol = "=";
          break;
        case "Inequality":
          formula.symbol = "<>";
          break;
        case "And":
          formula.symbol = "Y";
          break;
        case "Or":
          formula.symbol = "Ó";
          break;
        case "GreaterEqual":
          formula.symbol = ">=";
          break;
        case "LessEqual":
          formula.symbol = "<=";
          break;
        case "Not":
          formula.symbol = "NO";
          break;
        case "Percent":
          formula.symbol = "%";
          break;
        case "BooleanInequality":
          formula.symbol = "O exclusivo";
          break;
        default:
          break;
      }
    });
  }

  public onOperatorSelected(event) {
    const data: FormulaTransferData = {
      payload: event
    };

    if (this.isFormulaOperator(event)) {
      this.formulaService.emitFormulaItemClick(data);
    } else {
      this.operatorsService.emitOperatorClicked(data);
    }

    this.toogleMoreOperatorsVisibility();
  }

  public isFormulaOperator(operator: Operator | Formula): boolean {
    return operator.hasOwnProperty('valueid');
  }

  public onDragStart(event, operator: Operator, prefix?: string) {
    const data: FormulaTransferData = this.getOperatorTransferData(operator, prefix);

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  public onMoreOperatorsDragStart(event, operator: Operator, prefix: string) {
    const data: FormulaTransferData = {
      payload: operator
    };

    event.dataTransfer.setData('text/plain', JSON.stringify(data));

    console.log(data);
  }

  public onOperatorItemClick(event, operator, prefix?: string) {
    const data: FormulaTransferData = this.getOperatorTransferData(operator, prefix);

    this.operatorsService.emitOperatorClicked(data);
  }

  public getOperatorDefaultType() {
    return MathOperatorTypes.Numeric;
  }

  public getOperatorTransferData(operator: Operator, prefix?: string): FormulaTransferData {
    return {
      payload: operator
    };
  }

  public toogleMoreOperatorsVisibility() {
    this.isMoreOperatorsListOpened = !this.isMoreOperatorsListOpened;
  }

  public closeMoreOperatorsList() {
    this.isMoreOperatorsListOpened = false;
  }
}
