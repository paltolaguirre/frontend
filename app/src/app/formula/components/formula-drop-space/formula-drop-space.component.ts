import { OperatorCategory } from '../../../core/enums/operator-category.enum';
import { FormulaTransferData } from '../../../core/models/formula-transfer-data.model';
import { OperatorsService } from '../../../core/services/operators/operators.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormulaTerm } from 'src/app/core/models/formula-term.model';

@Component({
  selector: 'app-formula-drop-space',
  templateUrl: './formula-drop-space.component.html',
  styleUrls: ['./formula-drop-space.component.scss']
})
export class FormulaDropSpaceComponent implements OnInit, OnDestroy {
  @Output() formulaResultEmitter: EventEmitter<FormulaTerm> = new EventEmitter();
  @Input() isItemPickerExpanded: boolean;
  @Input()
  set currentFormulaResult(value: FormulaTerm) {
    if (value) {
      // TODO: render
      console.log('FormulaResult example:', value);
    }
  }
  @Input() formulaValue: any;

  public idCount: number = 0;
  public formulaResult: FormulaTerm;

  constructor(
    private formulaService: FormulaService,
    private operatorsService: OperatorsService
  ) { }

  ngOnInit() {
    this.formulaService.formulaPickerItemEmitter
      .pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe((payload: FormulaTransferData) => {
        // this.handleFormulaItemClicked(payload);
      });

    this.operatorsService.operatorEmitter
      .pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe((data: FormulaTransferData) => {
        if (data.payload.category === OperatorCategory.Logical) {
          // return this.handleLogicalOperatorClick(data);
        }

        // return this.handleMathOperatorClicked(data);
      });
  }

  ngOnDestroy() {
  }
}
