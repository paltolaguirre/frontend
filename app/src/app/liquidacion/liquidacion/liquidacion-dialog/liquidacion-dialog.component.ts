import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems , NovedadService } from 'src/app/novedad/novedad.service';
import { Novedad } from '../../../novedad/novedad.model';

@Component({
  selector: 'liquidacion-dialog.component',
  templateUrl: 'liquidacion-dialog.component.html',
  styleUrls: ['./liquidacion-dialog.component.css']
})
export class DialogLiquidaciones {
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Concepto',  'Importe' , 'Acciones'];
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
  
    getPageSizeOptions(): number[] {
      if (this.dataSource.data.length>20)
      return [5, 10, 20,  this.dataSource.paginator.length];
      else
      return [5, 10, 20];
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