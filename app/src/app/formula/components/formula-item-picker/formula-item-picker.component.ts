import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formula-item-picker',
  templateUrl: './formula-item-picker.component.html',
  styleUrls: ['./formula-item-picker.component.scss']
})
export class FormulaItemPickerComponent implements OnInit {
  @Output() expandedStateEmitter: EventEmitter<boolean> = new EventEmitter();

  public isExpanded: boolean;

  constructor() { }

  ngOnInit() {
  }

  public onExpandClick() {
    this.isExpanded = !this.isExpanded;

    this.expandedStateEmitter.emit(this.isExpanded);
  }
}
