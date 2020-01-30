import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getDataSource(items: any[], parseToTableItem): MatTableDataSource<any> {
    const dataTable: any[] = this.parseToTable(items, parseToTableItem);
    const datasource = new MatTableDataSource<any>(dataTable);

    return datasource;
  }

  parseToTable(items: any[], parseToTableItem: any): any[] {
    const tableItems = [];
    items.forEach(item => {
      const tableItem: any = parseToTableItem(item);
      tableItems.push(tableItem);
    }, this);

    return tableItems;
  }

  addDataSource(datasource: MatTableDataSource<any>, item: any) {
    datasource.data.push(item);

    return new MatTableDataSource<any>(datasource.data);
  }

  updateDataSource(datasource: MatTableDataSource<any>, item: any) {
    datasource.data.forEach(function (el, index) {
      if (el.ID == item.ID) datasource.data.splice(index, 1, item);
    }, this);

    return new MatTableDataSource<any>(datasource.data);
  }

  deleteDataSource(datasource: MatTableDataSource<any>, id: number) {
    datasource.data.forEach(function (el, index) {
      if (parseInt(el.ID, 10) == id) datasource.data.splice(index, 1);
    }, this);

    return new MatTableDataSource<any>(datasource.data);
  }
}
