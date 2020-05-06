import { FormulaTransferData } from '../../../core/models/formula-transfer-data.model';
import { Component, OnInit, OnDestroy, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-formula-drop-space',
  templateUrl: './formula-drop-space.component.html',
  styleUrls: ['./formula-drop-space.component.scss'],
  animations: [
    trigger('dragEnterDragLeave', [
      state('enter', style({
        boxShadow: '2px 2px 2px',
        background: 'red',
        transform: 'scale(1.3)'
      })),
      state('leave', style({
        boxShadow: '0 0 3px'
      })),
      transition('enter => leave', [
        animate('0.3s')
      ]),
      transition('leave => enter', [
        animate('0.15s')
      ]),
    ])
  ]
})
export class FormulaDropSpaceComponent implements OnInit, OnDestroy {
  @ViewChild('main', { static: false }) main: ElementRef;
  @Input() isItemPickerExpanded: boolean;
  @Input() formulaValue: any;

  public idCount: number = 0;
  public valuesinvoke = [];
  public isTrashDragOver: boolean;

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

  public onTrashDragOver(event) {
    event.preventDefault();

    this.setTrashDragEnterState();
    event.cancelBubble = true;
  }

  public onTrashDrop(event) {
    event.stopPropagation();
    this.setTrashDragLeaveState();

    const droppedData = JSON.parse(event.dataTransfer.getData('text'));

    console.clear();
    console.log('values invoke:', this.valuesinvoke);
    console.log('currentFormulaDroppedValue', droppedData);

    droppedData.valueinvokeid = null;
    droppedData.valueinvoke = null;
    droppedData.valuenumber = 0;

    // this.findAndReplaceCurrentFormulaValue(this.formulaValue.valueinvoke, droppedData);

    // console.log('modified:', currentFormulaValue);
  }

  // public findAndReplaceCurrentFormulaValue(valueinvoke, droppedData) {
  //   if (valueinvoke.ID === droppedData.ID) {
  //     valueinvoke = droppedData;

  //     return null;
  //   }

  //   valueinvoke.args.forEach((arg) => {
  //     if (arg.valueinvoke.ID === droppedData.ID) {
  //       arg.valueinvoke = droppedData;
  //     } else {
  //       if (arg.valueinvoke) {
  //         this.findAndReplaceCurrentFormulaValue(arg.valueinvoke, droppedData);
  //       }
  //     }

  //     console.log('arg:', arg);
  //   });
  // }

  public setTrashDragEnterState() {
    this.isTrashDragOver = true;
  }

  public setTrashDragLeaveState() {
    this.isTrashDragOver = false;
  }
}
