import { LiquidacionService } from '../liquidacion.service';
import { Liquidacion } from '../liquidacion.model';
import { formatDate } from "@angular/common";
import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
import { ListaItems , NovedadService } from 'src/app/novedad/novedad.service';
import { Novedad } from '../../novedad/novedad.model';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.css']
})
export class LiquidacionComponent implements OnInit, AfterViewInit {
  public currentLiquidacion$: Observable<Liquidacion> = null;
  paises: any[];
  id: number;
  data: any;

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
  
  
  onClickNovedades(data): void {
    const dialogRef = this.dialog.open(DialogLiquidaciones, {
       data
    });

    dialogRef.afterClosed().subscribe(result => {
   
    });
  }


  private gotoGrilla() {
    this.router.navigate(['/liquidaciones']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Liquidacion): Promise<Liquidacion> {
    let liquidacionesItem: Liquidacion;    
    
    if(data.fechaperiododepositado)data.fechaperiododepositado = formatDate(data.fechaperiododepositado, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US');
    if(data.fecha)data.fecha = formatDate(data.fecha, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US');
    if(data.fechaperiodoliquidacion)data.fechaperiodoliquidacion = formatDate(data.fechaperiodoliquidacion, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US');
    if(data.fechaultimodepositoaportejubilatorio)data.fechaultimodepositoaportejubilatorio = formatDate(data.fechaultimodepositoaportejubilatorio, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US');
 
    if(data.legajo)data.legajoid = data.legajo.ID;
    if(data.banco)data.cuentabanco = data.banco.ID;

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

  onClickDeleteChild(child: any) {
    child.DeletedAt = new Date();
  }

  onClickNewImportesremunerativos(data: Liquidacion) {
    if(data.importesremunerativos == null) {
      data.importesremunerativos = [{
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      }];      
    } else {
      data.importesremunerativos.push({
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      });
    }
  }


  onClickNewImportesNoremunerativos(data: Liquidacion) {
    if(data.importesnoremunerativos == null) {
      data.importesnoremunerativos = [{
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      }];      
    } else {
      data.importesnoremunerativos.push({
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      });
    }
  }

  onClickNewDescuento(data: Liquidacion) {
    if(data.descuentos == null) {
      data.descuentos = [{
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      }];      
    } else {
      data.descuentos.push({
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      });
    }
  }

  onClickNewRetenciones(data: Liquidacion) {
    if(data.retenciones == null) {
      data.retenciones = [{
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      }];      
    } else {
      data.retenciones.push({
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        codigo: null,
        descripcion: null,
        concepto: null,
        conceptoid: null,
        cantidad: null,
        porcentaje: null,
        sobreconcepto: null,
        sobreconceptoid: null,
        activo: 1,
        importeunitario: null,
        total: null
      });
    }
  }
}

@Component({
  selector: 'liquidacion-dialog.component',
  templateUrl: 'liquidacion-dialog.component.html',
  styleUrls: ['./liquidacion-dialog.component.css']
})
export class DialogLiquidaciones {
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Concepto', 'Importe' , 'Acciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  isLoadingResults = true;
  

  constructor(
    public dialogRef: MatDialogRef<DialogLiquidaciones>,
    private novedadService: NovedadService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onClickAgregar(): void {
      this.agregarTablas();
      this.dialogRef.close();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    private agregarTablas() {
      this.dataSource.data.forEach(element => {   
        var pushData = {conceptoid : element.conceptoid , importeunitario : element.importe};
        switch (element.tipoliquidacion) {
          case 1:
              if(this.data.descuentos == null) {
                this.data.descuentos = [pushData];      
              } else {
                this.data.descuentos.push(pushData);
              }
              break;
          case 2:
              if(this.data.retenciones == null) {
                this.data.retenciones = [pushData];      
              } else {
                this.data.retenciones.push(pushData);
              }
              break;
          case 3:
              if(this.data.importesremunerativos == null) {
                this.data.importesremunerativos = [pushData];      
              } else {
                this.data.importesremunerativos.push(pushData);
              }
              break;
          case 4:
              if(this.data.importesnoremunerativos == null) {
                this.data.importesnoremunerativos = [pushData];      
              } else {
                this.data.importesnoremunerativos.push(pushData);
              }
              break;
        }
      });
    }
    async ngOnInit() {
    const novedadesApi: ListaItems = await this.novedadService.getNovedades(this.sort.active, this.sort.direction, 1);
    this.dataSource = new MatTableDataSource<Novedad>(novedadesApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";
    this.isLoadingResults = false;
  }
  async ngAfterViewInit() {

  }

}