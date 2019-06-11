import { NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { formatDate } from "@angular/common";
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    this.router.navigate(['/novedades']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Novedad): Promise<Novedad> {
    let novedadesItem: Novedad;

    // se setea el paisID segun Option del selector de paises    
    /*
    2019-06-04T16:07:12.220847-03:00"
DeletedAt: n
    data.fecha = "T00:00:00.000000-00:00";*/
    
    data.fecha = formatDate(data.fecha, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US');


    if (this.id) {
      console.log("Updated Novedad");
      novedadesItem = await this.novedadService.putNovedad(data);
    } else {
      console.log("Created Novedad");
      novedadesItem = await this.novedadService.postNovedad(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(novedadesItem)
    return novedadesItem;
  }


  selectChangeLegajo(event,data)
  {
    data.legjao = event
    data.legajoid = event.id
  }

  selectChangeConcepto(event,data)
  {
    data.concepto = event
    data.conceptoid = event.id
  }

}