import { NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { formatDate } from "@angular/common";
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';

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
    private notificationService: NotificationService,
    private router: Router,
    public printService: PrintService
    ) { }

  ngOnInit() {
    this.currentNovedad$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Novedad");
        }
        this.id = +params.get('id');
        const novedad = this.novedadService.getNovedad(this.id);
        console.log(novedad);
        
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

    console.log(data);
    //this.create.emit(novedadesItem)
    return novedadesItem;
  }


  habilitarGuardado() {
    this.estaGuardandose = false
  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }

}