import { FormulaTransferData } from '../../../core/models/formula-transfer-data.model';
import { Component, OnInit, OnDestroy, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-formula-drop-space',
  templateUrl: './formula-drop-space.component.html',
  styleUrls: ['./formula-drop-space.component.scss']
})
export class FormulaDropSpaceComponent implements OnInit, OnDestroy {
  @ViewChild('main', { static: false }) main: ElementRef;
  @Input() isItemPickerExpanded: boolean;
  @Input() formulaValue: any;
  @Input() formulaIsEditable: boolean;
  @Input() formulaIsNew: boolean;

  public idCount: number = 0;
  public valuesinvoke = [];

  constructor() { }

  ngOnInit() {
    if(this.formulaValue && this.formulaValue !== undefined) {
      this.valuesinvoke = this.formulaValue;
    }
  }

  ngOnDestroy() {
  }

  public onDrop(event) {
    event.preventDefault();

    if (!this.isAbleToEdit()) {
      return null;
    }

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

      this.setDefaultArgValue(arg);

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

  public setDefaultArgValue(arg) {
    // Establece la condicion por defecto de los IFS en "verdadero".
    if (arg.name === 'condicion') {
      arg.Valueboolean = true;
    }
  }
  
  public onDragOver(event) { // allowDrop
    event.preventDefault();

    //this.onParamMouseOver(event);

    event.cancelBubble = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.formulaValue) {
      return null;
    }

    const value = changes.formulaValue.currentValue;

    if(value && value !== undefined) {
      this.valuesinvoke = value;
    }
  }

  public getDropSpaceWidth() {
    if (!this.main) {
      return null;
    }

    return this.main.nativeElement.offsetWidth;
  }

  public getDropSpaceHeight() {
    if (!this.main) {
      return null;
    }

    return this.main.nativeElement.offsetHeight;
  }

  public isAbleToEdit(): boolean {
    if (this.formulaIsNew) {
      return true;
    }

    return this.formulaIsEditable;
  }
}
