import { Component, OnInit } from '@angular/core';

export interface ItemMenu {
  nombre: string;
  url: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  itemsMenu: ItemMenu[] = [
    {nombre: 'Legajos', url: '/legajos'},
    {nombre: 'Conceptos', url: '/conceptos'},
    {nombre: 'Novedades', url: '/novedades'},
    {nombre: 'Liquidaciones', url: '/liquidaciones'},
    {nombre: 'Informe 913', url: '/f913'},
    {nombre: 'Libro Sueldos', url: '/librosueldos'},
  ];

  constructor() { }

  ngOnInit() {
  }
}
