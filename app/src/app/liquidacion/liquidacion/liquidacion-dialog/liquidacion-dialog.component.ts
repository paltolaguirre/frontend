import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems , NovedadService } from 'src/app/novedad/novedad.service';
import { Novedad } from '../../../novedad/novedad.model';
import { TIPO_CONCEPTO } from 'src/app/concepto/concepto.model';

@Component({
  selector: 'liquidacion-dialog.component',
  templateUrl: 'liquidacion-dialog.component.html',
  styleUrls: ['./liquidacion-dialog.component.css']
})
export class DialogLiquidaciones {
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Seleccionar', 'Concepto',  'Importe'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  isLoadingResults = true;
  

  constructor(
    public dialogRef: MatDialogRef<DialogLiquidaciones>,
    private novedadService: NovedadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() {
    if (this.data.legajo) {
      const novedadesApi: ListaItems = await this.novedadService.getNovedadesPorLegajo(this.data.legajo.ID, this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<Novedad>(novedadesApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;
    }
  }
  
  async ngAfterViewInit() {

  }

  onClickAgregar(): void {
    this.agregarTablas();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }

  private agregarTablas() {
    const seleccionados = this.dataSource.data.filter(element => element.checked);
    seleccionados.forEach((element: Novedad) => {   
      var pushData = {conceptoid : element.conceptoid , importeunitario : element.importe};
      switch (element.concepto.tipoconceptoid) {
        case TIPO_CONCEPTO.DESCUENTO:
          if(this.data.descuentos == null) {
            this.data.descuentos = [pushData];      
          } else {
            this.data.descuentos.push(pushData);
          }
          break;
        case TIPO_CONCEPTO.RETENCION:
          if(this.data.retenciones == null) {
            this.data.retenciones = [pushData];      
          } else {
            this.data.retenciones.push(pushData);
          }
          break;
        case TIPO_CONCEPTO.IMPORTE_REMUNERATIVO:
          if(this.data.importesremunerativos == null) {
            this.data.importesremunerativos = [pushData];      
          } else {
            this.data.importesremunerativos.push(pushData);
          }
          break;
        case TIPO_CONCEPTO.IMPORTE_NO_REMUNERATIVO:
          if(this.data.importesnoremunerativos == null) {
            this.data.importesnoremunerativos = [pushData];      
          } else {
            this.data.importesnoremunerativos.push(pushData);
          }
          break;
        case TIPO_CONCEPTO.APORTE_PATRONAL:
          if(this.data.aportespatronales == null) {
            this.data.aportespatronales = [pushData];      
          } else {
            this.data.aportespatronales.push(pushData);
          }
          break;
      }
    });
  }
}