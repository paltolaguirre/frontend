import { OperatorCategory } from '../../../core/enums/operator-category.enum';
import { FormulaTransferData } from '../../../core/models/formula-transfer-data.model';
import { OperatorsService } from '../../../core/services/operators/operators.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
  public valuesinvoke = [];

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
    if(this.formulaValue && this.formulaValue !== undefined) {
      this.valuesinvoke = this.formulaValue;
    }
  }

  ngOnDestroy() {
  }

  public onDrop(event) {
    event.preventDefault();

    const data: FormulaTransferData = JSON.parse(event.dataTransfer.getData('text'));

    if(data.payload == undefined) {
      return;
    }

    const args = [];
    data.payload.params.forEach((param, i) => {
      const arg = {
          ID: 0,
          name: param.name,
          type: param.type,
          valuenumber: 0,
          valuestring: param.valuestring == undefined ? "" : param.valuestring,
          Valueboolean: false,
          valueinvoke: null
      };
      args.push(arg);
    });

    const formulaInvoke = {
      ID: 0,
      function: {
        name: data.payload.name,
        params: data.payload.params,
        type: data.payload.type,
        result: data.payload.result
      },
      functionname: data.payload.name,
      args: args
    };
    
    const value = {
      ID: 0,
      name: "",
      type: "number",
      valuenumber: 0,
      valuestring: "",
      Valueboolean: false,
      valueinvoke: formulaInvoke
    };

    this.valuesinvoke.push(value);
    event.cancelBubble = true;
  }
  
  public onDragOver(event) { // allowDrop
    event.preventDefault();

    //this.onParamMouseOver(event);

    event.cancelBubble = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changed app-formula-drop-space: ", changes);
    const value = changes.formulaValue.currentValue;

    if(value && value !== undefined) {
      this.valuesinvoke = value;
    }
  }
}
