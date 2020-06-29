import { OperatorsService } from './../../../core/services/operators/operators.service';
import { Formula } from './../../../core/models/formula.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { EventHandlerService } from '../../services/event-handler.service';

export interface DataPayload {
  payload: Formula;
}

@Component({
  selector: 'app-formula-draw',
  templateUrl: './formula-draw.component.html',
  styleUrls: ['./formula-draw.component.scss']
})
export class FormulaDrawComponent implements OnInit {
  @Input() formulaValue: any;
  @Input() formulaParams: any;
  @Input() formulaIsEditable: boolean;
  @Input() formulaIsNew: boolean;

  private formula = {
    result: "number"
  };

  private prefixSymbol = new Map();
  private middleSymbol = new Map();

  constructor(private operatorService: OperatorsService, private eventHandlerService: EventHandlerService) {
    this.prefixSymbol.set('Not', "NEGADO");
    
    this.middleSymbol.set('Sum', "+");
    this.middleSymbol.set('Diff', "-");
    this.middleSymbol.set('Div', "/");
    this.middleSymbol.set('Multi', "*");
    this.middleSymbol.set('Greater', ">");
    this.middleSymbol.set('Less', "<");
    this.middleSymbol.set('Equality', "=");
    this.middleSymbol.set('Inequality', "<>");
    this.middleSymbol.set('And', "Y");
    this.middleSymbol.set('Or', "Ó");

    this.middleSymbol.set('Percent', "% DE");
    this.middleSymbol.set('GreaterEqual', ">=");
    this.middleSymbol.set('LessEqual', "<=");
    this.middleSymbol.set('BooleanInequality', "O exclusivo");
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changed app-formula-draw: ", changes);
  }
  
  toPrefixSymbol(name) {
    if(this.prefixSymbol.has(name)) {
      return this.prefixSymbol.get(name);
    } else {
      return "";
    }
  }
  
  toMiddleSymbol(name) {
    if(this.middleSymbol.has(name)) {
      return this.middleSymbol.get(name);
    } else {
      return "";
    }
  }

  valueChanged() {
    console.log("formulaValue: ", this.formulaValue); 
  }

  onClickNode(event) {
    this.eventHandlerService.onClickNode(event, this.isAbleToEdit());
  }

  onBlurInput(event) {
    this.eventHandlerService.onBlurInput(event);
  }

  onDrag(event, currentFormulaValue) {
    this.eventHandlerService.onDrag(event, currentFormulaValue, this.isAbleToEdit());
  }

  onDragEnd(event, currentFormulaValue) {
    this.eventHandlerService.onDragEnd(event, currentFormulaValue, this.isAbleToEdit());
  }

  onDrop(event, currentFormulaValue, parentFormulaParam={type: ''}) {
    // if(parentFormulaParam.type == '') parentFormulaParam.type = currentFormulaValue.valueinvoke.function.result;
    this.eventHandlerService.onDrop(event, currentFormulaValue, parentFormulaParam.type, this.isAbleToEdit());
  }

  onDragOver(event, id) { // allowDrop
    this.eventHandlerService.onDragOver(event, this.isAbleToEdit());
    /*console.log("onDragOver X: ", event.x);

    if (!this.isAbleToEdit()) {
      return null;
    }

    event.preventDefault();

    this.onEnter(event, id);

    event.cancelBubble = true;*/
  }

  onEnter(e, id) {
    this.eventHandlerService.onEnter(event, this.isAbleToEdit());
  }

  onLeave(e) {
    this.eventHandlerService.onLeave(e, this.isAbleToEdit());
  }

  public hideAllRemoveBadges() {
    const allBadges = Array.from(document.querySelectorAll('.remove-badge-container'));

    for (const badge of allBadges) {
      badge.classList.remove('show');
      badge.classList.add('hide');
    }
  }

  public showRemoveBadgeById(id: string) {
    const removeBadge = document.querySelector(`#value-${id}`);

    if (removeBadge) {
      removeBadge.classList.add('show');
      removeBadge.classList.remove('hide');
    }
  }

  onDragEnter(e, id) {
    this.eventHandlerService.onEnter(e, this.isAbleToEdit());
    // this.onEnter(e, id);
  }

  onDragLeave(e) {
    this.onLeave(e);
  }

  onMouseEnter(e, id) {
    e.stopPropagation();

    this.eventHandlerService.onEnter(e, this.isAbleToEdit());
    // this.onEnter(e, id);
  }

  onMouseLeave(e) {
    e.stopPropagation();

    this.onLeave(e);
  }
/** */
  onClickRemove(currentFormulaValue) {
  }

  public isAbleToEdit(): boolean {
    if (this.formulaIsNew) {
      return true;
    }

    return this.formulaIsEditable;
  }
}
