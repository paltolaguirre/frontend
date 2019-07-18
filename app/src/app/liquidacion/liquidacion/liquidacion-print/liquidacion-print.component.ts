import { Component, OnInit, Input } from '@angular/core';
import { Source } from 'webpack-sources';
import { Liquidacion } from '../../liquidacion.model';

@Component({
  selector: 'app-liquidacion-print',
  templateUrl: './liquidacion-print.component.html',
  styleUrls: ['./liquidacion-print.component.css']
})
export class LiquidacionPrintComponent implements OnInit {
  @Input() data: Liquidacion;
  
  constructor() { }

  ngOnInit() {

  }

}
