import { DateUtilsService } from './../../../core/utils/date-utils/date-utils.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {
  @Input() defaultDate: Date;
  @Output() monthIndexEmitter: EventEmitter<number> = new EventEmitter();

  public months: string[] = [];
  public selectedMonth: string;

  constructor(private dateUtils: DateUtilsService) { }

  ngOnInit() {
    this.setMonths();
    this.setDefaultMonth();
  }

  private setMonths() {
    this.months = this.dateUtils.getMonthNames();
  }

  private setDefaultMonth() {
    if (!this.defaultDate) {
      return null;
    }

    this.selectedMonth = this.dateUtils.getMonthName(this.defaultDate);
  }

  public onSelectorChange() {
    const index = this.months.indexOf(this.selectedMonth);

    this.monthIndexEmitter.emit(index);
  }
}
