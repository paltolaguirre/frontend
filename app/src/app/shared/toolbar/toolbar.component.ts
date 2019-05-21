import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectorComponent } from './selector/selector.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @ViewChild('centroSelector') centroSelector: SelectorComponent;
  @ViewChild('transportistaSelector') transportistaSelector: SelectorComponent;
  @ViewChild('pacienteSelector') pacienteSelector: SelectorComponent;

  constructor() { }

  ngOnInit() {
    /*this.centroSelector.elements = [
      {value: 'todos', viewValue: 'Todos los Centros'},
      {value: 'caballito', viewValue: 'Caballito'},
      {value: 'villaluro', viewValue: 'Villaluro'}
    ];

    this.transportistaSelector.elements = [
      {value: 'todos', viewValue: 'Todos los Transportistas'},
      {value: '20-309923887-9', viewValue: '20-309923887-9'},
      {value: '20-149923887-5', viewValue: '20-149923887-5'},
      {value: '20-249923888-8', viewValue: '20-249923888-8'}
    ];

    this.pacienteSelector.elements = [
      {value: 'todos', viewValue: 'Todos los Pacientes'},
      {value: 'caballito', viewValue: 'Rivera, Eliana'},
      {value: 'villaluro', viewValue: 'Jimenez, Fernando'},
      {value: 'villaluro', viewValue: 'Sanchez, Alberto'}
    ];*/


    this.centroSelector.elements = [
      'Todos los Centros',
      'Caballito',
      'Villaluro'
    ];

    this.transportistaSelector.elements = [
      'Todos los Transportistas',
      '20-309923887-9',
      '20-149923887-5',
      '20-249923888-8'
    ];

    this.pacienteSelector.elements = [
      'Todos los Pacientes',
      'Rivera, Eliana',
      'Jimenez, Fernando',
      'Sanchez, Alberto'
    ];
  }

}
