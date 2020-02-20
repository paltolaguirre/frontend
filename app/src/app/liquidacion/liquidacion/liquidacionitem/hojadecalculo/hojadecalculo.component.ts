import { Component, OnInit, Input } from '@angular/core';
import { Acumulador, Liquidacionitem } from 'src/app/liquidacion/liquidacion.model';


@Component({
  selector: 'app-hojadecalculo',
  templateUrl: './hojadecalculo.component.html',
  styleUrls: ['./hojadecalculo.component.css']
})
export class HojadecalculoComponent implements OnInit {
  
  @Input() liquidacionItem: Liquidacionitem;
  items: Array<Acumulador>;


  constructor() { }

  async ngOnInit() {

    this.items = this.liquidacionItem.acumuladores.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

  }

}
