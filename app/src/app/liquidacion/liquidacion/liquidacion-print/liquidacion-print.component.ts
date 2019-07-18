import { Component, OnInit, Input } from '@angular/core';
import { Source } from 'webpack-sources';
import { Liquidacion } from '../../liquidacion.model';
import { EmpresaService } from 'src/app/empresa/empresa.service';
import { Empresa } from 'src/app/empresa/empresa.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-liquidacion-print',
  templateUrl: './liquidacion-print.component.html',
  styleUrls: ['./liquidacion-print.component.css']
})
export class LiquidacionPrintComponent implements OnInit {
  @Input() data: Liquidacion;
  empresa: Empresa;
  constructor(private empresaService: EmpresaService,) { }

  async ngOnInit() {
    this.empresa = await this.empresaService.getEmpresa(914);
    console.log(this.empresa);
  }

}
