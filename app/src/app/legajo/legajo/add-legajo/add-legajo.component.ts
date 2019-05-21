import { Component, AfterViewInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, LegajoService } from '../../legajo.service';
import { Legajo } from '../../legajo.model';

/*export interface DialogData {
  legajoId: number;
  numeroLegajo: string;
  conductor: string;
  fecha: string;
  tipo: string;
}*/

@Component({
  selector: 'app-add-legajo',
  templateUrl: './add-legajo.component.html',
  styleUrls: ['./add-legajo.component.css']
})
export class AddLegajoComponent {
  @Input() legajo: number;
  @Output() public update = new EventEmitter<Legajo>();
  @Output() public delete = new EventEmitter<Legajo>();
  numeroLegajo: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(public dialog: MatDialog, private legajoService: LegajoService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLegajoDialog, {
      width: '875px',
      height: '520px',
      data: { ID: this.legajo, numeroLegajo: this.numeroLegajo, fecha: this.fecha, tipo: this.tipo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialog fue cerrado '+ JSON.stringify(result));
      if(result) {
        this.update.emit(result);
      }
    });
  }

  async deleteItem() {
    const item: Legajo = {
      ID: this.legajo,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      nombre: null,
      apellido: null,
      codigo: null,
      descripcion: null,
      activo: null,
      legajo: null,
      cuil: null,
      cbu: null,
      direccion: null,
      hijos: null,
      paisid: null,
      localidadid: null,
      provinciaid: null,
      zonaid: null,
      telefono: null,
      email: null,
      modalidadcontratacionid: null,
      categoria: null,
      tarea: null,
      situacionid: null,
      condicionid: null,
      condicionsiniestradoid: null,
      obrasocialid: null,
      conveniocolectivoid: null,
      valorfijolrt: null,
      conyuge: null,
      remuneracion: null,
      horasmensualesnormales: null,
      fechaalta: null,
      fechabaja: null,
      centrodecostoid: null
    }

    await this.legajoService.deleteLegajo(item);
    this.delete.emit(item);
  }

}

@Component({
  selector: 'add-legajo-dialog',
  templateUrl: 'add-legajo-dialog.component.html',
  styleUrls: ['./add-legajo.component.css'],
})
export class AddLegajoDialog implements AfterViewInit{
  @Output() public create = new EventEmitter<Legajo>();

  constructor(
    public dialogRef: MatDialogRef<AddLegajoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Legajo,
    private legajoService: LegajoService
  ) { 

  }
  
  async ngAfterViewInit() {
    console.log("ngAfterViewInit()");
    if (this.data.ID) {
      console.log("Nro. Legajo: " + this.data.ID);
      
      const legajosItem: Legajo = await this.legajoService.getLegajo(this.data.ID);
      this.data = legajosItem;
    
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onClickSave(): Promise<Legajo> {
    let legajosItem: Legajo;
    if (this.data.ID) {
      legajosItem = await this.legajoService.putLegajo(this.data);
    } else {
      legajosItem = await this.legajoService.postLegajo(this.data);
    }

    this.create.emit(legajosItem)
    return legajosItem;
  }
}