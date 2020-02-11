import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  private monthNames: string[] = [];

  constructor() {
    this.monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
      'Noviembre', 'Diciembre'
    ];
  }

  public getMonthNames(): string[] {
    return this.monthNames;
  }

  public getMonthName(date: Date): string {
    return this.monthNames[date.getMonth()];
  }

  public getMonthIndexFromName(monthName: string) {
    return this.monthNames.indexOf(monthName);
  }
}
