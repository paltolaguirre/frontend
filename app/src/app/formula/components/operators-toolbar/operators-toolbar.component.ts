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
  public basicMathOperators: Operator[];
  public logicalOperators: Operator[];

  constructor(
    private formulaService: FormulaService,
    private operatorsService: OperatorsService
  ) { }

  ngOnInit() {
    this.fetchFormulas();
    this.basicMathOperators = this.operatorsService.getBasicMathOperators();
    this.logicalOperators = this.operatorsService.getLogicalOperators();
  }

  public fetchFormulas() {
    this.formulaService.formulasStore$.subscribe((formulas: Formula[]) => {
      this.formulas = formulas;

      const formulaOperators: Formula[] = this.formulaService.extractFormulasByType(
        this.formulas,
        FormulaTypes.OPERATOR
      );

      this.moreOperators = [
        ...this.operatorsService.getMoreStaticOperators(),
        ...formulaOperators
      ];
    });
  }

  public onOperatorSelected(event) {
    const data: FormulaTransferData = {
      nodeId: `more-operators-${event.id || event.valueid}`,
      payload: event
    };

    if (this.isFormulaOperator(event)) {
      this.formulaService.emitFormulaItemClick(data);
    } else {
      this.operatorsService.emitOperatorClicked(data);
    }

    setTimeout(() => { this.selectedOperator = null; });
  }

  public isFormulaOperator(operator: Operator | Formula): boolean {
    return operator.hasOwnProperty('valueid');
  }

  public onDragStart(event, operator: Operator) {
    const data: FormulaTransferData = {
      nodeId: event.target.id,
      payload: operator
    };

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  public onOperatorItemClick(event, operator) {
    const data: FormulaTransferData = {
      nodeId: event.target.id,
      payload: operator
    };

    this.operatorsService.emitOperatorClicked(data);
  }

  public getOperatorDefaultType() {
    return MathOperatorTypes.Numeric;
  }
}
