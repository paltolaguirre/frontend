import { DateUtilsService } from './../../../core/utils/date-utils/date-utils.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {
  @Input() defaultDate: Date;
  @Input() selectedMonths?: number[];
  @Input() placeholder?: string;
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

    this.onSelectorChange();
  }

  public onSelectorChange() {
    const index = this.months.indexOf(this.selectedMonth);

    this.monthIndexEmitter.emit(index);
  }

  public isDisabled(optionMonthName: string): boolean {
    if (!this.selectedMonths) {
      return false;
    }

    const optionMonthIndex: number = this.dateUtils.getMonthIndexFromName(optionMonthName);
    const optionMonthAlreadySelectedInTheTable: boolean =
      this.selectedMonths.some((selectedMonthIndex) => selectedMonthIndex === optionMonthIndex);

    const selectedMonth: number = this.selectedMonths.find((index) => index === optionMonthIndex);
    const indexOfSelectedMonth: number = this.dateUtils.getMonthIndexFromName(this.selectedMonth);
    const isOptionCurrentlyOpen: boolean = selectedMonth === indexOfSelectedMonth;

    return (
      optionMonthAlreadySelectedInTheTable &&
      !isOptionCurrentlyOpen
    );
  }
}
