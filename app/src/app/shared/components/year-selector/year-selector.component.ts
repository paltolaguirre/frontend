import { Component, OnInit, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit, DoCheck {
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() defaultDate: Date;

  public years: number[] = [];
  public currentDate: Date;
  public selectedYear: number;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.setYearsArray();
  }

  ngDoCheck() {
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

  private getMinimumYear(): number {
    if (!this.minDate) {
      const minDate = new Date();
      minDate.setFullYear(1950);

      return minDate.getFullYear();
    }

    return this.minDate.getFullYear();
  }

  private getMaximumYear(): number {
    if (!this.maxDate) {
      return this.currentDate.getFullYear();
    }

    return this.maxDate.getFullYear();
  }

  private setDefaultYear() {
    if (!this.defaultDate) {
      return null;
    }

    this.selectedYear = this.years.find((year) => {
      return year === this.defaultDate.getFullYear();
    });

    if (this.selectedYear) {
      this.onSelectorChange();
    }
  }

  public onSelectorChange() {
    console.log('Cambió: ', this.selectedYear);
  }
}
