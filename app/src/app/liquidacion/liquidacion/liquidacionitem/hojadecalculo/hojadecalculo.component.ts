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
    
    this.items = this.liquidacionItem.acumuladores;

    //SOLO QUIERO AGREGAR TITULOS LOCOS CUANDO ES GANANCIAS
    if (this.liquidacionItem.concepto.codigo == 'IMPUESTO_GANANCIAS' || this.liquidacionItem.concepto.codigo == 'IMPUESTO_GANANCIAS_DEVOLUCION'){
      
      //AGREGO SUBTOTALES
      const subtotalesOrden = [15, 35, 38, 43, 44, 51, 53]
      
      this.items = this.items.map(function (a){
        a.esSubtotal = subtotalesOrden.includes(a.orden)
        return a
      });

      //AGREGO SUBTITULOS
      var subtitles = [{
        orden:38.5,
        nombre:'Deducciones Personales',
        codigo:'DEDUCCIONES_PERSONALES_TITLE',
        importe: null,
        esSubtitulo: true
      },{
        orden:0.5,
        nombre:'Remuneraciones',
        codigo:'REMUNERACIONES_TITLE',
        importe: null,
        esSubtitulo: true
      },{
        orden:15.5,
        nombre:'Deducciones Generales',
        codigo:'DEDUCCIONES_GENERALES_TITLE',
        importe: null,
        esSubtitulo: true
      },{
        orden:48.5,
        nombre:'Determinacion de Impuesto',
        codigo:'DETERMINACION_IMPUESTO_TITLE',
        importe: null,
        esSubtitulo: true
      }];      
      Array.prototype.push.apply(this.items, subtitles);

    }
    
    this.items.sort(function (a, b) {
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
