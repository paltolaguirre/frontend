import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

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
}
