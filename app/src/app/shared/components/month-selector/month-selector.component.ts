import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {
  @Output() yearEmitter: EventEmitter<string> = new EventEmitter();

  public months: string[] = [];
  public currentDate: Date;
  public selectedMonth: string;

  constructor() { }

  ngOnInit() {
  }

  public onSelectorChange() {
    this.yearEmitter.emit(this.selectedMonth);
  }
}
