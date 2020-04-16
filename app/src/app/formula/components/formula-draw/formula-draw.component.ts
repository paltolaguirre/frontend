import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Formula } from 'src/app/core/models/formula.model';

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

  private prefixSymbol = new Map();
  private middleSymbol = new Map();

  constructor() {
    this.prefixSymbol.set('Not', "NOT");
    
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

    //currentFormulaValue.valueinvoke = null;
    //currentFormulaValue.valuenumber = 0;
    event.cancelBubble = true;
  }

  onDragEnd(event, currentFormulaValue) {
    currentFormulaValue.valueinvokeid = null;
    currentFormulaValue.valueinvoke = null;
    currentFormulaValue.valuenumber = 0;
    event.cancelBubble = true;
  }

  onDrop(event, currentFormulaValue) {
    event.preventDefault();

    const data: DataPayload = JSON.parse(event.dataTransfer.getData('text'));

    console.log("onDrop: ", data);

    if(data.payload === undefined) {
      currentFormulaValue.valueinvoke = data;
      currentFormulaValue.valuenumber = 0;
      return;
    }

    const args = [];
    data.payload.params.forEach((param, i) => {
      const arg = {
          ID: 0,
          name: param.name,
          type: param.type,
          valuenumber: 0,
          valuestring: "",
          Valueboolean: false,
          valueinvoke: null
      };
      args.push(arg);
    });

    const formulaInvoke = {
      ID: 0,
      function: {
        name: data.payload.name,
        type: data.payload.type
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

  /*public onParamMouseOver(e) {
    e.stopPropagation();

    this.highlightElement(e.target);

    this.addRemoveIcon(e);

    this.removeHighlightToElement(e.target.parentNode);

    e.cancelBubble = true;
  }*/

  onOverInput(event){
    const input:HTMLElement = event.target;
    input.classList.replace('no-highlight', 'highligthed');
  }

  onOutInput(event){
    const input:HTMLElement = event.target;
    input.classList.replace('highligthed', 'no-highlight');
  }
}
