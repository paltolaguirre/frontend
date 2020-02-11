import { FormulaCategory } from './../../../core/models/formula-category.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formula-item-picker',
  templateUrl: './formula-item-picker.component.html',
  styleUrls: ['./formula-item-picker.component.scss']
})
export class FormulaItemPickerComponent implements OnInit {
  @Output() expandedStateEmitter: EventEmitter<boolean> = new EventEmitter();

  public isExpanded: boolean = true;
  public categories: FormulaCategory[];

  constructor() {
    this.categories = [
      {
        id: 1,
        title: 'Elementos',
        items: [
          {
            id: 1,
            img: 'assets/img/descarga.jpg',
            title: 'Variables'
          },
          {
            id: 2,
            img: 'assets/img/descarga.jpg',
            title: 'Conceptos en la liquidación'
          },
          {
            id: 3,
            img: 'assets/img/descarga.jpg',
            title: 'Parámetros de entrada'
          }
        ]
      },
      {
        id: 2,
        title: 'Fórmulas',
        items: [
          {
            id: 4,
            img: 'assets/img/descarga.jpg',
            title: 'Fórmulas estandar'
          },
          {
            id: 5,
            img: 'assets/img/descarga.jpg',
            title: 'Mis fórmulas'
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

  public onExpandClick() {
    this.isExpanded = !this.isExpanded;

    this.expandedStateEmitter.emit(this.isExpanded);
  }
}
