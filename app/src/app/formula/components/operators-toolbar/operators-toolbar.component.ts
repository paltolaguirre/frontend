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
  public operators: Formula[];
  public selectedOperator: Formula = null;
  public basicMathOperators: Operator[];

  constructor(
    private formulaService: FormulaService,
    private operatorsService: OperatorsService
  ) { }

  ngOnInit() {
    this.fetchFormulas();
    this.basicMathOperators = this.operatorsService.getBasicMathOperators();
  }

  public fetchFormulas() {
    this.formulaService.formulasStore$.subscribe((formulas: Formula[]) => {
      this.formulas = formulas;

      this.operators = this.formulaService.extractFormulasByType(this.formulas, FormulaTypes.OPERATOR);
    });
  }

  public onOperatorSelected() {
    // TODO: Create the operator in the draggable space and reset the select.
    console.log(this.selectedOperator);
    setTimeout(() => { this.selectedOperator = null; });
  }

  public onDragStart(event, operator: Operator) {
    const data = {
      nodeId: event.target.id,
      payload: operator
    };

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  public onOperatorItemClick(event, operator) {
    this.operatorsService.emitOperatorClicked({ node: event.target, operator });
  }
}
