import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
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
export class TrashComponent implements OnInit {

  public isTrashDragOver: boolean;

  constructor() { }

  ngOnInit() {
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
    // console.log('values invoke:', this.valuesinvoke);
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
