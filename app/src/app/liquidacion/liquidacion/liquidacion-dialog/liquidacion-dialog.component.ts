import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems , NovedadService } from 'src/app/novedad/novedad.service';
import { Novedad } from '../../../novedad/novedad.model';
import { TIPO_CONCEPTO } from 'src/app/concepto/concepto.model';

@Component({
  selector: 'liquidacion-dialog.component',
  templateUrl: 'liquidacion-dialog.component.html',
  styleUrls: ['./liquidacion-dialog.component.css']
})
export class DialogLiquidaciones {
 
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['Seleccionar', 'Concepto', 'Cantidad', 'Importe'];
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
      var pushData = {
        conceptoid: element.conceptoid,
        cantidad: element.cantidad,
        importeunitario: element.importe,
        concepto: element.concepto
      };
      
      if(this.data.liquidacionitems == null) {
        this.data.liquidacionitems = [pushData];      
      } else {
        this.data.liquidacionitems.push(pushData);
      }
    });
  }
}