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
  subtotalesOrden: Array<number>

  constructor() {
   }

  async ngOnInit() {
    const subtotalesOrden = [15, 35, 38, 43, 44, 51, 53]
    this.items = this.liquidacionItem.acumuladores.map(function (a){
      a.esSubtotal = subtotalesOrden.includes(a.orden)
      return a
    }).sort(function (a, b) {
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
