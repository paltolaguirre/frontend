import { Component, OnInit } from '@angular/core';

export interface ItemMenu {
  name: string;
  url: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  itemsMenu: ItemMenu[] = [
    {name: 'Legajos', url: '/legajos'},
    {name: 'Conceptos', url: '/conceptos'},
    {name: 'Fórmulas', url: '/formulas'},
    {name: 'Novedades', url: '/novedades'},
    {name: 'Liquidaciones', url: '/liquidaciones'},
    {name: 'Informe 931', url: '/informes/cargas-sociales-f931'},
    {name: 'Libro Sueldos', url: '/informes/libro-sueldos'},
    {name: 'SiRADIG', url: '/siradig'},
    {name: 'F.1357 Liquidacion Anual', url: '/informes/liquidacion-final-anual-f1357'}
  ];

  constructor() { }

  ngOnInit() {
  }
}
