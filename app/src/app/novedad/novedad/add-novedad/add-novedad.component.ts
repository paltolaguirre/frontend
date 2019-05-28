import { Component, AfterViewInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, NovedadService } from '../../novedad.service';
import { Novedad } from '../../novedad.model';

/*export interface DialogData {
  novedadId: number;
  numeroNovedad: string;
  conductor: string;
  fecha: string;
  tipo: string;
}*/

@Component({
  selector: 'app-add-novedad',
  templateUrl: './add-novedad.component.html',
  styleUrls: ['./add-novedad.component.css']
})
export class AddNovedadComponent {
  @Input() novedad: number;
  @Output() public update = new EventEmitter<Novedad>();
  @Output() public delete = new EventEmitter<Novedad>();
  numeroNovedad: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(public dialog: MatDialog, private novedadService: NovedadService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNovedadDialog, {
      width: '875px',
      height: '520px',
      data: { ID: this.novedad, numeroNovedad: this.numeroNovedad, fecha: this.fecha, tipo: this.tipo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialog fue cerrado '+ JSON.stringify(result));
      if(result) {
        this.update.emit(result);
      }
    });
  }

  async deleteItem() {
    const item: Novedad = {
      ID: this.novedad,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      nombre: null,
      codigo: null,
      descripcion: null,
      activo: null,
      importe: null,
      cantidad: null,
      fecha: null,
      legajo: null,
      legajoid: null,
      concepto: null,
      conceptoid: null
    }

    await this.novedadService.deleteNovedad(item);
    this.delete.emit(item);
  }

}

@Component({
  selector: 'add-novedad-dialog',
  templateUrl: 'add-novedad-dialog.component.html',
  styleUrls: ['./add-novedad.component.css'],
})
export class AddNovedadDialog implements AfterViewInit{
  @Output() public create = new EventEmitter<Novedad>();

  constructor(
    public dialogRef: MatDialogRef<AddNovedadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Novedad,
    private novedadService: NovedadService
  ) { 

  }
  
  async ngAfterViewInit() {
    console.log("ngAfterViewInit()");
    if (this.data.ID) {
      console.log("Nro. Novedad: " + this.data.ID);
      
      const novedadesItem: Novedad = await this.novedadService.getNovedad(this.data.ID);
      this.data = novedadesItem;
    
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onClickSave(): Promise<Novedad> {
    let novedadesItem: Novedad;
    if (this.data.ID) {
      novedadesItem = await this.novedadService.putNovedad(this.data);
    } else {
      novedadesItem = await this.novedadService.postNovedad(this.data);
    }

    this.create.emit(novedadesItem)
    return novedadesItem;
  }
}