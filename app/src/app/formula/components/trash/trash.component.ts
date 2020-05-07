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
  }

  public setTrashDragEnterState() {
    this.isTrashDragOver = true;
  }

  public setTrashDragLeaveState() {
    this.isTrashDragOver = false;
  }
}
