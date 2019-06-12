import { LiquidacionService } from '../liquidacion.service';
import { Liquidacion } from '../liquidacion.model';
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
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.css']
})
export class LiquidacionComponent implements OnInit, AfterViewInit {
  public currentLiquidacion$: Observable<Liquidacion> = null;
  paises: any[];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private liquidacionService: LiquidacionService, 
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService: PrintService
    ) { }

  ngOnInit() {
    this.currentLiquidacion$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Liquidacion");
        }
        this.id = +params.get('id');
        const liquidacion = this.liquidacionService.getLiquidacion(this.id);
        console.log(liquidacion);
        
        return liquidacion;
      })
    );
  }

  ngAfterViewInit() {

  }

  private gotoGrilla() {
    this.router.navigate(['/liquidaciones']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Liquidacion): Promise<Liquidacion> {
    let liquidacionesItem: Liquidacion;    

    if (this.id) {
      console.log("Updated Liquidacion");
      liquidacionesItem = await this.liquidacionService.putLiquidacion(data);
    } else {
      console.log("Created Liquidacion");
      liquidacionesItem = await this.liquidacionService.postLiquidacion(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(liquidacionesItem)
    return liquidacionesItem;
  }

}