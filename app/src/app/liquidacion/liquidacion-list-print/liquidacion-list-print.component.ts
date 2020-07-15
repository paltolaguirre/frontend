import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoadingService } from "src/app/core/services/loading/loading.service";
import { LiquidacionService } from "../liquidacion.service";
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: "app-liquidacion-list-print",
  templateUrl: "./liquidacion-list-print.component.html",
  styleUrls: ["./liquidacion-list-print.component.scss"],
})
export class LiquidacionListPrintComponent implements OnInit {
  liquidaciones = [];
  ids;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private liquidacionService: LiquidacionService,
    public printService: PrintService
  ) {}

  async ngOnInit() {
    this.ids = this.route.snapshot.queryParamMap.get("ids");
    if(!this.ids) return;

    const arrayId = this.ids.split(',');
    var idsFiltered = arrayId.filter(function (item) {
      return (parseInt(item) == item);
    });
    console.log("IDs: ", idsFiltered);

    this.loadingService.show();
    idsFiltered.forEach(async id => {
      const liquidacion = await this.liquidacionService.getLiquidacion(id);
      this.liquidaciones.push(liquidacion);
    });
    //this.fechaperiododepositado = liquidacion.fechaperiododepositado?liquidacion.fechaperiododepositado.substring(0, 7):liquidacion.fechaperiododepositado;
    //this.fechaperiodoliquidacion = liquidacion.fechaperiodoliquidacion?liquidacion.fechaperiodoliquidacion.substring(0, 7):liquidacion.fechaperiodoliquidacion;
    console.log("liquidaciones: ", this.liquidaciones);
    this.loadingService.hide();
  }

  onClickPrint() {
    this.printService.printTOPDF();
  }
}
