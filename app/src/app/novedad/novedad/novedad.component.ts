import { NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { formatDate } from "@angular/common";
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
import { Concepto } from 'src/app/concepto/concepto.model';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit, AfterViewInit {
  public currentNovedad$: Observable<Novedad> = null;
  paises: any[];
  id: number;
  public estaGuardandose = false;

  constructor(
    private route: ActivatedRoute,
    private novedadService: NovedadService,
    public dialog: MatDialog,
    private router: Router,
    public printService: PrintService,
    private loadingService: LoadingService
    ) { }

  ngOnInit() {
    this.currentNovedad$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Novedad");
        }
        this.id = +params.get('id');

        this.loadingService.show();
        const novedad = await this.novedadService.getNovedad(this.id);
        this.loadingService.hide();

        return novedad;
      })
    );
  }

  ngAfterViewInit() {

  }

  private gotoGrilla() {
    this.estaGuardandose = true;
    this.router.navigate(['/novedades']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Novedad): Promise<Novedad> {
    if (this.estaGuardandose) return null;

    this.loadingService.show();

    this.estaGuardandose = true;
    let novedadesItem: Novedad;

    // se setea el paisID segun Option del selector de paises
    /*
    2019-06-04T16:07:12.220847-03:00"
DeletedAt: n
    data.fecha = "T00:00:00.000000-00:00";*/

    if(data.fecha) data.fecha = formatDate(data.fecha, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US');
    if(data.legajo) data.legajoid = data.legajo.ID;
    if(data.concepto) data.conceptoid = data.concepto.ID;

    var that = this;
    if (this.id) {
      console.log("Updated Novedad");
      novedadesItem = await this.novedadService.putNovedad(data).finally(function(){that.habilitarGuardado();});
      this.gotoGrilla();
    } else {
      console.log("Created Novedad");
      novedadesItem = await this.novedadService.postNovedad(data).finally(function(){that.habilitarGuardado();});
      this.gotoGrilla();
    }

    this.loadingService.hide();

    return novedadesItem;
  }


  habilitarGuardado() {
    this.estaGuardandose = false
  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }

  tieneFormula(concepto: Concepto) : Boolean {
    if (concepto && concepto.tipocalculoautomaticoid == -3){
      return true;
    }

    return false;
  }

  limpiarImporte(data: Novedad){
    if (this.tieneFormula(data.concepto)){
      data.importe = null
    }
  }
}
