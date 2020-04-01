import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() defaultDate: Observable<Date>;
  @Output() yearEmitter: EventEmitter<number> = new EventEmitter();

  public years: number[] = [];
  public currentDate: Date;
  public selectedYear: number;

  public readonly MIN_DEFAULT_YEAR: number = 1950;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.setYearsArray();
    this.setDefaultYear();
  }

  private setYearsArray() {
    const max: number = this.getMaximumYear();
    const min: number = this.getMinimumYear();

    for (let index = min; index <= max; index++) {
      this.years.push(index);
    }

    this.years = this.years.reverse();
  }

  public getMinimumYear(): number {
    if (!this.minDate) {
      return this.MIN_DEFAULT_YEAR;
    }

    return this.minDate.getFullYear();
  }

  public getMaximumYear(): number {
    if (!this.maxDate) {
      return this.currentDate.getFullYear();
    }

    return this.maxDate.getFullYear();
  }

  private setDefaultYear() {
    if (!this.defaultDate) {
      return null;
    }

    this.defaultDate.subscribe((defaultDate) => {
      this.selectedYear = this.years.find((year) => {
        return year === defaultDate.getFullYear();
      });

      if (this.selectedYear) {
        this.onSelectorChange();
      }
    });
  }

  public onSelectorChange() {
    this.yearEmitter.emit(this.selectedYear);
  }
}
