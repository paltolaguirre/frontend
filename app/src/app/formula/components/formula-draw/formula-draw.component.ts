import { OperatorsService } from './../../../core/services/operators/operators.service';
import { Formula } from './../../../core/models/formula.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

export interface DataPayload {
  payload: Formula;
}

@Component({
  selector: 'app-formula-draw',
  templateUrl: './formula-draw.component.html',
  styleUrls: ['./formula-draw.component.scss']
})
export class FormulaDrawComponent implements OnInit {
  @Input() formulaValue: Formula;
  @Input() formulaParams: any;

  private formula = {
    result: "number"
  };

  private prefixSymbol = new Map();
  private middleSymbol = new Map();

  constructor(private operatorService: OperatorsService) {
    this.prefixSymbol.set('NEGADO', "NOT");
    
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
    const input = event.target.children[0];
    input.style.display = "block";
    input.focus();
  }

  onBlurInput(event) {
    const input = event.target;
    input.style.display = "none";
  }

  onDrag(event, currentFormulaValue) {
    event.dataTransfer.setData('text', JSON.stringify(currentFormulaValue.valueinvoke));
    event.cancelBubble = true;
  }

  onDragEnd(event, currentFormulaValue) {
    this.invokeRemuve(currentFormulaValue);
    event.cancelBubble = true;
  }

  onDrop(event, currentFormulaValue, parentFormulaParam={type: ''}) {
    event.preventDefault();

    const data: DataPayload = JSON.parse(event.dataTransfer.getData('text'));

    console.log("onDrop: ", data);
    this.operatorService.emitOperatorDrop(data);

    if(data.payload === undefined) {
      currentFormulaValue.valueinvoke = data;
      currentFormulaValue.valuenumber = 0;
      return;
    }

    if(/*data.payload.result != undefined && currentFormulaValue.type != undefined && */data.payload.result != currentFormulaValue.type && data.payload.result != parentFormulaParam.type) {
      let message;
      switch (data.payload.result) {
        case 'number':
          message = "Se intenta usar tipo de dato NUMERICO donde se espera BOOLEANO.";
          break;
        case 'boolean':
          message = "Se intenta usar tipo de dato BOOLEANO donde se espera NUMERICO.";
          break;
        default:
          message = "Tipos de datos incompatibles.";
          break;
      }
      
      const warningBox = document.getElementById('warningBox');
      warningBox.innerHTML = `<p>${message}</p>`;
      warningBox.style.display = 'block';
      setTimeout(() => warningBox.style.display = 'none', 3*1000);
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

    currentFormulaValue.valueinvoke = formulaInvoke
    event.cancelBubble = true;
  }


  public onDragOver(event) { // allowDrop
    event.preventDefault();

    this.onOverInput(event);

    event.cancelBubble = true;
  }

  onOverInput(event){
    const input:HTMLElement = event.target;
    input.classList.replace('no-highlight', 'highligthed');

    for (let index = 0; index < input.children.length; index++) {
      const item = input.children.item(index);
      if(item.className.includes("remove-badge-container")) {
        item.classList.replace('hide', 'show');
      }
    }
  }

  onOutInput(event){
    const input:HTMLElement = event.target;
    input.classList.replace('highligthed', 'no-highlight');

    for (let index = 0; index < input.children.length; index++) {
      const item = input.children.item(index);
      if(item.className.includes("remove-badge-container")) {
        item.classList.replace('show', 'hide');
      }
    }
  }

  onClickRemove(currentFormulaValue) {
    this.invokeRemuve(currentFormulaValue);
  }

  private invokeRemuve(currentFormulaValue) {
    currentFormulaValue.valueinvokeid = null;
    currentFormulaValue.valueinvoke = null;
    currentFormulaValue.valuenumber = 0;
  }
}
