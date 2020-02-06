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

  public getMonthName(date: Date) {
    return this.monthNames[date.getMonth()];
  }
}
