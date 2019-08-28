import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ListaItems, LiquidacionService } from 'src/app/liquidacion/liquidacion.service';
import { merge, Observable } from 'rxjs';
import { Liquidacion, Tipo } from 'src/app/liquidacion/liquidacion.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-librosueldos-list-print',
  templateUrl: './librosueldos-list-print.component.html',
  styleUrls: ['./librosueldos-list-print.component.css']
})
export class LibrosueldosListPrintComponent implements OnInit {
  @Input() liquidaciones: any;
  public currentLiquidaciones$: Observable<Liquidacion[]> = null;

  constructor(
    private route: ActivatedRoute,
    private liquidacionService: LiquidacionService,
    ) { }

  ngOnInit() {
    this.currentLiquidaciones$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        const liquidacionesApi = await this.liquidacionService.getLiquidaciones(null, null, 1);
        console.log("Liquidaciones: " + liquidacionesApi.items);
         
        return liquidacionesApi.items;
      })
    );
  }

  async ngAfterViewInit() {
    const liquidacionesApi: ListaItems = await this.liquidacionService.getLiquidaciones(null, null, 1);
    this.liquidaciones = liquidacionesApi.items;
    console.log(this.liquidaciones);
  }
}
