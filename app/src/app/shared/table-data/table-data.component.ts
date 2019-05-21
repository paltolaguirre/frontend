import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface TrasladoElement {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  HC: string;
  Paciente: string;
  Distancia: string;
  Condicion: string;
  Traslados: number;
  CUIL: string;
  Centro: string;
  Tarifa: number;
  Peaje: number;
  Total: number;
}

const ELEMENT_DATA: TrasladoElement[] = [
  {
    ID: 1,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC2837746',
    Paciente: 'Rivera, Eliana',
    Distancia: '13',
    Condicion: 'Normal',
    Traslados: 20,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 2080
  },
  {
    ID: 2,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC6637436',
    Paciente: 'Jimenez, Fernando',
    Distancia: '11',
    Condicion: 'Normal',
    Traslados: 26,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 2080
  },
  {
    ID: 3,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC2992834',
    Paciente: 'Sanchez, Alberto',
    Distancia: '9',
    Condicion: 'Normal',
    Traslados: 22,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 2080
  },
  {
    ID: 4,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC2992834',
    Paciente: 'Sanchez, Alberto',
    Distancia: '9',
    Condicion: 'Normal',
    Traslados: 4,
    CUIL: '20-149923887-5',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 320
  },
  {
    ID: 5,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC1127722',
    Paciente: 'Gonzales, Juan',
    Distancia: '11',
    Condicion: 'Especial',
    Traslados: 24,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 120,
    Peaje: 50,
    Total: 2880
  },
  {
    ID: 6,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC9938277',
    Paciente: 'Urquiza Vallejo, M…',
    Distancia: '7',
    Condicion: 'Normal',
    Traslados: 26,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: 50,
    Total: 2080
  },
  {
    ID: 7,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC2837746',
    Paciente: 'Rivera, Eliana',
    Distancia: '13',
    Condicion: 'Normal',
    Traslados: 20,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 2080
  },
  {
    ID: 8,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC6637436',
    Paciente: 'Jimenez, Fernando',
    Distancia: '11',
    Condicion: 'Normal',
    Traslados: 26,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 2080
  },
  {
    ID: 9,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC2992834',
    Paciente: 'Sanchez, Alberto',
    Distancia: '9',
    Condicion: 'Normal',
    Traslados: 22,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 2080
  },
  {
    ID: 10,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC2992834',
    Paciente: 'Sanchez, Alberto',
    Distancia: '9',
    Condicion: 'Normal',
    Traslados: 4,
    CUIL: '20-149923887-5',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: null,
    Total: 320
  },
  {
    ID: 11,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC1127722',
    Paciente: 'Gonzales, Juan',
    Distancia: '11',
    Condicion: 'Especial',
    Traslados: 24,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 120,
    Peaje: 50,
    Total: 2880
  },
  {
    ID: 12,
    CreatedAt: '2019-01-15T10:21:54.652265-03:00',
    UpdatedAt: '2019-01-22T11:07:38.64822-03:00',
    DeletedAt: null,
    HC: 'HC9938277',
    Paciente: 'Urquiza Vallejo, M…',
    Distancia: '7',
    Condicion: 'Normal',
    Traslados: 26,
    CUIL: '20-309923887-9',
    Centro: 'Caballito',
    Tarifa: 80,
    Peaje: 50,
    Total: 2080
  },
];

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() public displayedColumns: string[];
  @Input() public data: Object[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

}
